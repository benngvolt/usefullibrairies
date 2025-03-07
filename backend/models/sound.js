const mongoose = require('mongoose');
const validator = require('validator');

const soundSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: false},
    category: {type: String, required: false},
    price: {type: Number, required: false},
});


module.exports = mongoose.model('Sound', soundSchema);