const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const validator = require('../utils/validator');


exports.createUser = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;

        // Validate email
        if (!validator.validateEmail(email)) {
            return res.status(400).send({ message: 'Invalid email address.' });
        }

        // Validate password strength
        if (!validator.validatePassword(password)) {
            return res.status(400).send({ message: 'Password does not meet strength requirements.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword
        });

        res.status(201).send({ message: 'User created successfully', user: { id: user._id, fullName, email } });
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error code
            return res.status(400).send({ message: 'Email already exists.' });
        }
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const { email, fullName, password } = req.body;

        // Validate password strength
        if (password && !validator.validatePassword(password)) {
            return res.status(400).send({ message: 'Password does not meet strength requirements.' });
        }

        const hashedPassword = password ? await bcrypt.hash(password, 12) : undefined;

        // Update user
        const update = {
            ...(fullName && { fullName }),
            ...(hashedPassword && { password: hashedPassword })
        };

        const user = await User.findOneAndUpdate({ email }, update, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        res.status(200).send({ message: 'User updated successfully', user: { id: user._id, fullName: user.fullName, email: user.email } });
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOneAndDelete({ email });

        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, 'fullName email');

        res.status(200).send({ users });
    } catch (error) {
        next(error);
    }
};
