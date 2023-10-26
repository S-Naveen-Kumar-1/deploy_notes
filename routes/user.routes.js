const express = require("express");
const { UserModel } = require("../model/user.model");
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

userRouter.post("/register", (req, res) => {
    const { email, password, username } = req.body;
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(200).send({ "error": err.message })
            }
            else {
                const user = new UserModel({
                    username,
                    email,
                    password: hash
                })
                await user.save()
                res.status(200).send({ "msg": "user registered successfully", "user_details": user })
            }
        });
    }
    catch (err) {
        res.status(400).send({ "error": err.message })

    }
})
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        bcrypt.compare(password, user.password, async (err, result) => {
            if (result) {
                const token = jwt.sign({ username:user.username,userid:user._id }, "masai")
                res.status(200).send({ "msg": "user logged in", "token": token })
            }
            else {
                res.status(200).send({ "err":"wrong credentials" })
            }
        });
    }
    catch (err) {
        res.status(400).send({ "err": err.message })

    }
})

module.exports = { userRouter }