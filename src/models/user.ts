const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { isEmpty, head } = require('lodash')
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: (value) => {
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
userSchema.pre('save', async function (next) {
	const user = this
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8)
	}
	next()
})

userSchema.statics.findByCredentials = async (email, password) => {
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

userSchema.statics.checkPassword = async (userId, password) => {
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
