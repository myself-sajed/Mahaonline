const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({

    applicationDetails: { type: Object, required: true },
    beneficiaryDetails: { type: Object, required: true },
    incomeDetails: { type: Object, required: true },
    vleDetails: { type: String, required: true },
    payment: { type: Boolean, default: false },
    uploadId: { type: String, default: 'null' },
    isUploaded: { type: Boolean, default: false },
    pendingAt: { type: String, default: 'Pending At Tehsil Clerk' },
    rejection: { type: Boolean, default: false },
    rejectionReason: { type: String, default: 'null' }
}, { timestamps: true })

module.exports = mongoose.model('application', applicationSchema)