const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    shortId:{type: String, required: true, unique: true},
    redirectUrl:{type: String, required: true},
    visitHistory: [
        {
            timestamp: { type: String },
            ipAddress: { type: String },
            location: {
                city: { type: String },
                region: { type: String },
                country: { type: String },
                loc: { type: String },
                org: { type: String },
                postal: { type: String },
                timezone: { type: String }
            }
        }
    ]
},
{
    timestamps: true
});

module.exports = mongoose.model('urls', urlSchema);