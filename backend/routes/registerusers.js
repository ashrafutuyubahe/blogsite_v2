const express = require('express');
const router = express.Router();
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const User = require('../models/users'); 


// Joi schema for user registration
const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    useremail: Joi.string().email().required(),
    userpassword: Joi.string().min(4).required(),
});

router.post("/", async (req, res) => {
    try {
        const { error, value } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: _.get(error, "details[0].message", "Invalid request") });
        }

        const hashedPassword = await bcrypt.hash(req.body.userpassword, 10); // Hash the user's password
        const newUser = new User({
            username: req.body.username,
            useremail: req.body.useremail,
            userpassword: hashedPassword
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            message: "You have successfully registered.please login now",
            user: _.omit(savedUser.toObject(), ["userpassword"]), 
        });
       

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
