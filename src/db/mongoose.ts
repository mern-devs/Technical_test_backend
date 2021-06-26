const mongoose = require('mongoose')
const mongoDbUrl = 'mongodb+srv://mobileguru:ajsjdrys616Z@cluster0.s1xww.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoDbUrl, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
}, (error) => {
	if(error) {
		console.log(error)
	}
	console.log('Connected to Mongodb')
})
