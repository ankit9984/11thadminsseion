import Admin from "../models/admin_model.js";
import { generateToken, setTokenCookie } from "../utils/jwt.utils.js";
import bcrypt from 'bcryptjs'
import { validateEmail, validatePassword } from "../utils/validation.utils.js";

const registerAdmin = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        //Input validation
        if(!username || !email || !password){
            return res.status(400).json({error: 'ALl fields are required'});
        };
        // console.log(email);
        if(!validateEmail(email)){
            // console.log(email);
            return res.status(400).json({error: 'Invalid email formate'});
        }

        // if(!validatePassword(password)){
        //     return res.status(400).json({ error: 'Password does not meet security requirements' });
        // }
        
        const existingAdmina = await Admin.findOne({
            $or: [{username: username}, {email: email}]
        });

        if(existingAdmina){
            return res.status(400).json({error: 'Username or email already exist'})
        };

        const newAdmin = new Admin({
            username,
            email,
            password
        });

        await newAdmin.save();
        const token = generateToken(newAdmin);
        setTokenCookie(res, token);

        // console.log(newAdmin);

        const adminResponse = newAdmin.toObject();
        // console.log(adminResponse);
        delete adminResponse.password;
       
        res.status(201).json({message: 'New admin create successfully', admin: adminResponse, token});
    } catch (error) {
        console.error('Error in newAdmin', error);
        res.status(500).json(error.message)
    }
};

const loginAdmin = async (req, res) => {
    try {
        const {username, password} = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const admin = await Admin.findOne({username}).select('+password');
        console.log(admin);
        if(!admin){
            return res.status(400).json({error: 'Invalid email or password'});
        };

        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch){
            return res.status(400).json({ error: 'Invalid email or password' });
        };

        const token = generateToken(admin);
        setTokenCookie(res, admin);

        const adminResponse = admin.toObject();
        delete adminResponse.password;

        res.status(200).json({ message: 'Login successful', admin: adminResponse ,token });
    } catch (error) {
        console.error('Error in loginAdmin', error);
        res.status(500).json({ error: error.message, });
    }
}

const logoutAdmin = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true
    });
    res.status(200).json({message: 'Logout successful'});
}

export {
    registerAdmin,
    loginAdmin,
    logoutAdmin
}