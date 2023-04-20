const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

console.log(mongoose.Types.ObjectId.isValid("643d571fc4798fc69121008b"));

module.exports = mongoose.model('Department', departmentSchema);