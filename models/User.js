const mongoose = require("mongoose"),
    Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    pw: {
        type: String,
        required: true
    },

    signupDate: {
        type: Date,
        default: Date.now()
    },

    stocksOwned: {
        type: Array,
        default: []
    }
})

module.exports = User = mongoose.model("user", UserSchema);