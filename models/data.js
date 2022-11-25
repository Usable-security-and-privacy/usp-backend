const mongoose = require('mongoose');
const { Schema } = mongoose;

const dataSchema = new Schema({
    name: String,
    email: String,
    age: Number,
    response: [String],
});

const Data = mongoose.model('User', dataSchema);

module.exports = Data;