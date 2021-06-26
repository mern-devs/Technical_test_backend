const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { isEmpty, head } = require('lodash')
import { NextFunction } from 'express'
import mongoose, { Document, Schema } from 'mongoose'
export type IUser = Document & {
    name: string;
    email: string;
    password: string;
    findByCredentials: findByCredentialsFunction;
    checkPassword: checkPasswordFunction
} 
type findByCredentialsFunction = (email: string, password: string) => IUser;
type checkPasswordFunction = (userId: string, password: string) =>  IUser;
const userSchema = new Schema<IUser>({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: (value: string) => {
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid')
			}
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		maxlength: 128
	},
}, {
	timestamps: true
})
userSchema.pre("save", async function (next) {
	const user = this as IUser
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8)
	}
	next()
})

userSchema.statics.findByCredentials = async (email: string, password: string) => {
	let users = await User.find().or([
		{ email },
		{ username: email }
	])
	if (isEmpty(users)) {
		throw new Error('User does not exist')
	}
	const user = head(users)
	const isMatch = await bcrypt.compare(password, user.password)
	if (!isMatch) {
		throw new Error('Password does not match')
	}
	return user
}

userSchema.statics.checkPassword = async (userId: string, password: string) => {
	const user = await User.findById(userId);
	if (isEmpty(user)) {
		throw new Error('User does not exist')
	}
	const isMatch = await bcrypt.compare(password, user.password)
	if (!isMatch) {
		throw new Error('Password does not match')
	}
	return user
}
userSchema.set('toJSON', {virtuals: true})
const User = mongoose.model('User', userSchema)
module.exports = User
