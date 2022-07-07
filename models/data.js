const mongoose = require('mongoose');
const { Schema } = mongoose;

const dataSchema = new Schema({
    data: {
        type: String
    }
});

const Data = mongoose.model('User', dataSchema);

module.exports = Data;