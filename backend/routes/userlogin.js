const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const User = require('../models/users');
const public_key= process.env.public_key

// Joi schema for login
const schema = Joi.object({
    useremail: Joi.string().email().required(),
    userpassword: Joi.string().required(),
});

router.post("/", async (req, res) => {
    try {
    console.log(req.body);
        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

       
        const user = await User.findOne({ useremail: req.body.useremail });
        if (!user) {
            console.log(req.body)
            return res.status(400).json({ error: "Invalid email or password" });
        }

      
        const passwordMatch = await bcrypt.compare(req.body.userpassword, user.userpassword);
        if (!passwordMatch) {
            console.log(req.body)
            return res.status(400).json({ error: "Invalid email or password" });
        }

       
        const token = jwt.sign({ useremail: user.useremail, username: user.username }, public_key, { expiresIn: '2minutes' });

       
        res.status(200).json({ message: "You have successfully loged in ", token: token });
     
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
