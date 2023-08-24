const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        default: 'Harry Potter'
    },
    email: {
        type: String,
        required: [true, 'DB: email is required']
    },
    password: {
        type: String,
        required: [true, 'DB: password is required']
    },
    token: {
        type: String,
        default: null
    },
});

module.exports = model('user', userSchema);
