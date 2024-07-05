import mongoose from 'mongoose';

const collegeDetailsSchema = new mongoose.Schema({
    udiseNumber: {
        type: Number,
        required: [true, 'UDISE number is required'],
        unique: true,
        trim: true
    },
    jrCollegeName: {
        type: String,
        required: [true, 'College name is required'],
        trim: true,
        maxlength: [100, 'College name cannot be more than 100 characters']
    },
    managementType: {
        type: String,
        required: [true, 'Management type is required'],
        trim: true,
        enum: ['Government', 'Private', 'Aided']
    },
    foundationYear: {
        type: Number,
        required: [true, 'Foundation year is required'],
        min: [1800, 'Foundation year must be 1800 or later'],
        max: [new Date().getFullYear(), 'Foundation year cannot be in the future']
    },
    collegeType: {
        type: String,
        enum: ['Girls', 'Boys', 'Co-Ed'],
        required: [true, 'College type is required']
    },
    website: {
        type: String,
        trim: true,
        match: [/^https?:\/\/\S+$/, 'Please enter a valid URL']
    },
    collegeCategory: {
        type:String,
        trim: true
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CollegeAddress'
    },
    stream: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stream'
    }]
}, {timestamps: true});

const College = mongoose.model('College', collegeDetailsSchema);

export default College;

