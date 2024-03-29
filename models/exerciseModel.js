const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    duration: {
        type: Number,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    sysdate: {
        type: Date,
        required: true
    }
},
{timestamps: true})

const Exercise = mongoose.model('Exercise', exerSchema);

module.exports = Exercise