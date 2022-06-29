import { Request, Response } from "express"
import { User } from "../models"
import { comparePassword, hashPassword } from "../utils"
import jwt from "jsonwebtoken"
require("dotenv").config()

export const auth = async (req: Request, res: Response) => {
	try {
		// console.log(req.body);
		const { name, email, password } = req.body
		// validation
		if (!name) return res.status(400).send("Name is required")
		if (!password || password.length < 6) {
			return res
				.status(400)
				.send("Password is required and should be min 6 characters long")
		}
		let userExist = await User.findOne({ email }).exec()
		if (userExist) return res.status(400).send("Email is taken")

		// hash password
		const hashedPassword = await hashPassword(password)

		// register
		const user = new User({
			name,
			email,
			password: hashedPassword,
		})
		await user.save()
		// console.log("saved user", user);
		return res.json({ ok: true })
	} catch (err) {
		console.log(err)
		return res.status(400).send("Error. Try again.")
	}
	// console.log(req.body)
	// res.send("Express + TypeScript Server")
}

export const login = async (req: Request, res: Response) => {
	try {
		// console.log(req.body);
		const { email, password } = req.body
		// check if our db has user with that email
		const user = await User.findOne({ email }).exec()
		if (!user) return res.status(401).send("Unauthorized")
		// check password
		const match = await comparePassword(password, user.password!)
		if (!match) {
			throw new Error("Incorrect Password")
		}
		// create signed jwt
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
			expiresIn: "7d",
		})
		// return user and token to client, exclude hashed password
		user.password = undefined
		// send token in cookie
		res.cookie("token", token, {
			httpOnly: true,
			// secure: true, // only works on https
		})
		// send user as json response
		res.json(user)
	} catch (err) {
		console.log(err)
		return res.status(400).send("Error. Try again.")
	}
}

export const logout = async (req: Request, res: Response) => {
	try {
		res.clearCookie("token")
		return res.json({ message: "Signout success" })
	} catch (err) {
		console.log(err)
	}
}

interface IGetUserAuthInfoRequest extends Request {
	auth: {
		_id: string,
	}
  }
export const currentUser = async (req: Request, res: Response) => {
	try {

		const user = await User.findById((<any>req).auth._id)
			.select("-password")
			.exec()
		// console.log("CURRENT_USER", user)
		// console.log(req.auth._id as any)
		return res.json({ok: true})
	} catch (err) {
		console.log(err)
	}
}
