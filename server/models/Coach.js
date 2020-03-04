const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coachSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    location: {
        type: String
    },
    lunched: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    category: {
        type: Number,
        default: 1
    },

}, { timestamps: true })


coachSchema.index({ 
    name:'text',
    description: 'text',
    location: 'text',
}, {
    weights: {
        name: 5,
        description: 3,
        location: 5,
    }
})

const Coach = mongoose.model('Coach', coachSchema);

module.exports = { Coach }