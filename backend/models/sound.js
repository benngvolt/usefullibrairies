const mongoose = require('mongoose');
const validator = require('validator');

const soundSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: false},
    categoryId: {type: String, required: true},
    price: {type: Number, required: false},
    url: {type: String, required: true},
    author: {type: String, required: false},
    previewUrl: {type: String, required: true }
});


module.exports = mongoose.model('Sound', soundSchema);