import College from "../models/college.model.js";
import { handleError } from "../utils/validation.utils.js";


const createCollege = async (req, res) => {
    try {
        const {udiseNumber, jrCollegeName, managementType, foundationYear, collegeType, website, collegeCategory, address} = req.body;

        const existingCollege = await College.findOne({udiseNumber});
        if (existingCollege) {
            return res.status(400).json({ error: 'College with this UDISE number already exists' });
        }

        const newCollege = new College({
            udiseNumber,
            jrCollegeName,
            managementType,
            foundationYear,
            collegeType,
            website,
            collegeCategory,
            address
        });

        await newCollege.save();
        res.status(201).json({message: 'College created successfully', college: newCollege})
    } catch (error) {
        // console.error('Error in createCollege', error);
        // console.log('Error', error);
        handleError(error, res)
    }
};

const getCollege = async (req, res) => {
    try {
        const {collegeId} = req.params;
        const college = await College.findById(collegeId);
        if(!college){
            return res.status(404).json({error: 'College not found'})
        };

        res.status(200).json(college);
    } catch (error) {
        res.status(500).json({ error: 'Server Error', message: 'An unexpected error occurred.' });
    }
}

const updateCollege = async (req, res) => {
    try {
        const {collegeId} = req.params;
        const updates = req.body;

        const existingCollege = await College.findById(collegeId);
        if(!existingCollege){
            return res.status(404).json({error: 'College not found'})
        }
              
        const college = await College.findByIdAndUpdate(collegeId, updates, {new: true, runValidators: true});

        // if(!college){
        //     return res.status(404).json({error: 'College not found'})
        // };

        res.status(200).json({message: 'College updated successfully', college})
    } catch (error) {
        if(error.name === 'ValidationError'){
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({error: 'Validation Error', details: errors});
        }else if(error.code === 11000){
            return res.status(400).json({ error: 'Duplicate Error', message: 'A college with this information already exists.' });
        } else {
            res.status(500).json({ error: 'Server Error', message: 'An unexpected error occurred.' });
        }
    }
};

const deleteCollege = async (req, res) => {
    try {
        const deletedCollege = await College.findByIdAndDelete(req.params.collegeId);
        if (!deletedCollege) {
            return res.status(404).json({ error: 'College not found' });
        }
        res.status(200).json({ message: 'College deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error', message: 'An unexpected error occurred.' });
    }
};

const getAllColleges = async (req, res) => {
    try {
        const colleges = await College.find().populate('address');
        res.status(200).json(colleges);
    } catch (error) {
        res.status(500).json({ error: 'Server Error', message: 'An unexpected error occurred.' });
    }
};

export {
    createCollege,
    getCollege,
    updateCollege,
    deleteCollege,
    getAllColleges
}