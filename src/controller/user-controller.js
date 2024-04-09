import User from "../modle/user-model.js"
import { sendToken } from "../../utils/jwtToken.js"
const Register = async (req, res, next) => {
    try {
        const { fullname, email, password } = req.body
        if (
            !fullname || !email || !password
        ) {
            return res.status(400).send({ message: "all field are required" })
        }
        const userExist = await User.findOne({ email })
        if (userExist) return res.status(400).send({ message: "the user is already exist" })

        const createdUser = await User.create({
            fullname,
            password,
            email,
        })

        const user = await User.findById(createdUser._id).select("-password")
        if (!user) return res.status(500).send({ message: "somthing went wrong while creating user" })

        sendToken(user, res, "user registered successfuly", 200)
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: "error is accoure while registering" })

    }
}
const Login = async (req, res, next) => {

    try {
        const { email, password, } = req.body
        if (!email || !password) return res.status(400).send({ message: "please entered email and password" })

        const user = await User.findOne({ email })
        if (!user) return res.status(400).send({ message: "email or password is not correct" })


        const isPasswordMatched = await user.isPasswordCorrect(password)
        if (!isPasswordMatched) return res.status(400).send({ message: "email or password does'nt match" })
        sendToken(user, res, "logedIn successfuly", 200)

    } catch (error) {
        console.log(error)
    }

}
const logedOut = async (req, res, next) => {
    res.status(201).cookie("token", "", {
        httpOnly: true,
        expiresIn: new Date(Date.now()),
    }).send({ success: true, message: "LogedOut successfuly" })
}

const getuser = async (req, res, next) => {
    const user = req.user

    if (!user) return res.status(500).send({ message: "user not found" })
    res.status(200).send({ success: true, user })
}



export { Register, Login, getuser, logedOut }