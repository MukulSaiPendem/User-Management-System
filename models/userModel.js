
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// Create a schema for the user with validation
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please tell us your full name!'],
        trim: true,
        validate: {
            validator: function(v) {
                // Simple validation for full name, you might want to make this more robust
                return /^[a-zA-Z ]{2,100}$/.test(v);
            },
            message: props => `${props.value} is not a valid full name!`
        }
    },
    email: {
        type: String,
        required: [true, 'Please provide your email!'],
        unique: true, // Unique index to ensure email is not duplicated
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email!']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        minlength: 8, // Enforce a minimum length for passwords
        select: false // Ensure that password is not returned in any queries by default
    }
});

// Use a pre-save hook to hash the password before saving it to the database
userSchema.pre('save', async function(next) {
    // Only run this function if the password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    next();
});

// Instance method to check password validity
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
