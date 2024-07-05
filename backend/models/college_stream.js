import mongoose from "mongoose";

// Fee Schema
const feeSchema = new mongoose.Schema({
    tuitionFees: {
        type: Number,
        required: [true, 'Tuition fees are required']
    },
    termFees: {
        type: Number,
        required: [true, 'Term fees are required']
    },
    otherFees: {
        type: Number,
        required: [true, 'Other fees are required']
    },
    totalFees: {
        type: Number,
        required: [true, 'Total fees are required']
    },
    annualFeesForIT: {
        type: Number
    }
});

// Optional Subject Schema
const optionalSubjectSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: [true, 'Subject name is required']
    },
    intake: {
        type: Number,
        required: [true, 'Subject intake is required']
    }
});

// Bifocal Subject Schema
const bifocalSubjectSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: [true, 'Subject name is required']
    },
    status: {
        type: String,
        required: [true, 'Subject status is required']
    },
    intake: {
        type: Number,
        required: [true, 'Subject intake is required']
    },
    totalFees: {
        type: Number,
        required: [true, 'Subject total fees are required']
    }
});

// Main Stream Schema
const streamSchema = new mongoose.Schema({
    streamCode: {
        type: String,
        required: [true, 'Stream code is required'],
        unique: true,
        trim: true,
        index: true  // Add index for faster queries
    },
    streamName: {
        type: String,
        required: [true, 'Stream name is required'],
        trim: true,
        index: true  // Add index for faster queries
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        enum: ['Self Finance', 'Un-Aided', 'Aided']
    },
    medium: {
        type: String,
        required: [true, 'Medium is required'],
        trim: true
    },
    intake: {
        type: Number,
        required: [true, 'Intake is required'],
        min: [1, 'Intake must be at least 1']
    },
    minorityDetails: {
        type: String,
        trim: true
    },
    isOfferingITSubjects: {
        type: Boolean,
        default: false
    },
    fees: {
        type: feeSchema,
        // required: true
        // select: false
    },
    optionalSubjects: {
        type: [optionalSubjectSchema],
        default: [],
        // select: false
    },
    bifocalSubjects: {
        type: [bifocalSubjectSchema],
        default: [],
        // select: false
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required: true,
        index: true  // Add index for faster queries
    }
}, { timestamps: true });

const Stream = mongoose.model('Stream', streamSchema);

export default Stream;