const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


//defining our user properties
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    password: { type: String, required: true },
    email: { type: String, required: true },
    employeeNumber: { type: String }

});


//hashing the password before it is saved to the database
userSchema.pre('save', async function (next) {
    //if the password hasn't changed then exit immediately
    if (!this.isModified('password')) return next();

    //hash the password
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
module.exports = mongoose.model('User', userSchema);