import College from "../models/college.model.js";
import CollegeAddress from "../models/college_adress.model.js"
import { handleError } from "../utils/validation.utils.js";

const createCollegeAddress = async (req, res) => {
    try {
        const {collegeId} = req.params
        const {street, city, area, ward, Zone, region, pinCode, nearestBusStop, nearestLandmark, nearestRailwayStation} = req.body;
        
        const college = await College.findById(collegeId);
        if(!college){
            return res.status(404).json({error: 'College not found'})
        };

        const newCollegeAddress = new CollegeAddress({
            street,
            city,
            area,
            ward,
            Zone,
            region,
            pinCode,
            nearestBusStop,
            nearestLandmark,
            nearestRailwayStation,
            college: collegeId
        });

        await newCollegeAddress.save();
        college.address = newCollegeAddress._id;
        await college.save();

        res.status(201).json({message: 'College address created successfully', college: newCollegeAddress})
    } catch (error) {
        handleError(error, res);
    }
};

const getCollegeAddress = async (req, res) => {
    try {
        const {addressId} = req.params;
        const address = await CollegeAddress.findById(addressId);
        if(!address){
            return res.status(404).json({error: 'College address not found'});
        }
        res.status(200).json(address);
    } catch (error) {
        handleError(error, res);
    }
};

const updatedAddress = async (req, res) => {
    try {
        const {addressId} = req.params;
        const updates = req.body;

        const existingAddress = await CollegeAddress.findById(addressId);
        if(!existingAddress){
            return res.status(404).json({error: 'College address not found'});
        }

        const updatedAddress = await CollegeAddress.findByIdAndUpdate(addressId, updates, {new: true, runValidators: true});
        res.status(200).json({message: 'College address updated successfully', address: updatedAddress});
    } catch (error) {
        handleError(error, res)
    }
};

const deleteCollegeAddress = async (req, res) => {
    try {
        const {addressId} = req.params;
        console.log(addressId);
        const collegeAddress = await CollegeAddress.findByIdAndDelete(addressId);
        if(!collegeAddress){
            return res.status(404).json({ error: 'College address not found' });
        };
        

    //    const college = await College.findById(collegeAddress.college);
    //    console.log(college);

    //    if(college){
    //         college.address = null,
    //         await college.save();
    //    }

       await College.findByIdAndUpdate(collegeAddress.college, { $unset: { address: 1 } });
       res.status(200).json({ message: 'College address deleted successfully' });
    } catch (error) {
        handleError(error, res)
    }
}

export {
    createCollegeAddress,
    getCollegeAddress,
    updatedAddress,
    deleteCollegeAddress
}