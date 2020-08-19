const mongoose = require('mongoose');
const { Schema } = mongoose;

const EntrySchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: Date, default: Date.now},
    user: {type: String},
    userName: {type: String, required: true}
});

module.exports = mongoose.model('Entry', EntrySchema);