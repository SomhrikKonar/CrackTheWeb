import { Router } from "express"
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//number of salt rounds to hash the password
const saltRounds = 10;

//initialising router
const router = Router()

//route to register a user
router.post("/register", async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds)
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            })
            newUser.save()
            res.status(200).json("User registered")
        }
        else {
            res.status(400).json("User already exists")
        }

    } catch (err) {
        console.log(err)
    }
})

//route to login a user
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const validPassword = bcrypt.compareSync(req.body.password, user.password)
            if (validPassword) {
                const token = jwt.sign({ id: user._id }, 'secretkey')
                res.status(200).json(token)
            }

            !validPassword && res.status(401).json("Invalid password")
        } else {
            res.status(400).json("User not found")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//route for admin registration
router.post("/admin", async (req, res) => {
    try {

        //if the user trying to login is an admin
        if (req.body.email === process.env.ADMIN_EMAIL) {
            const verifiedAdmin = true
            const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds)
            const admin = await User.findOne({ email: req.body.email })
            if (!admin) {
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword,
                    isAdmin: verifiedAdmin
                })
                newUser.save()
                res.status(200).json("Admin registered")
            }
            else {
                res.status(400).json("Admin already exists")
            }
        }
        else{
            res.status(401).json("You don't have access to this")
        }
    } catch (err) {
        console.log(err)
    }
})
export default router