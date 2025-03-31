const mongoose = require('mongoose');
const validator = require('validator');

const categorySchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: false},
    imageUrl: {type: String, required: false}
});


module.exports = mongoose.model('Category', categorySchema);