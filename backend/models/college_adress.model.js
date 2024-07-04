import mongoose from "mongoose";

const addressShema = new mongoose.Schema({
    street: {
        type: String,
        required: [true, 'Street address is required'],
        trim: true
    },
    city: {
        type: String,
        require: [true,'City is required'],
        trim: true
    },
    area: {
        type: String,
        required: [true, 'Area is required'],
        trim: true
    },
    ward: {
        type: String,
        required: [true, 'Ward is required'],
        trim: true
    },
    Zone: {
        type: String,
        required: [true, 'Zone is required'],
    },
    region: {
        type: String,
        required: [true, 'Region is required'],
    },
    pinCode: {
        type: String,
        required: [true, 'Region is required'],
        match: [/^\d{6}$/, 'Please enter a valid 6-digit PIN code']
    },
    nearestLandmark: String,
    nearestBusStop: String,
    nearestRailwayStation: String,
    railwayStationDistance: String,
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required: true
    }
},{timestamps: true});

const CollegeAddress = mongoose.model('CollegeAddress', addressShema);

export default CollegeAddress;

