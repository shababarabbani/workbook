const mongoose = require('mongoose')

const ExperienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        trim: true,
        required: true,
    },
    jobRole: {
        type: String,
        trim: true,
        required: true
    },
    jobType: {
        type: String,
        default: 'Full Time',
        enum: ['Full Time', 'Part Time', 'Internship']
    },
    year: {
        type: Number,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Public',
        enum: ['Public', 'Private']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Experience', ExperienceSchema)