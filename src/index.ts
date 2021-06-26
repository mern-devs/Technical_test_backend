const express = require('express')
require('./db/mongoose.ts')
const app = express()
const {logError, logRequest} = require('./middlewares/logs')

const http = require('http').createServer(app)
const usersRouter = require('./routers/users')
app.use(express.json())
app.use(logRequest)
app.use(logError)
app.use(usersRouter);

const PORT = 3000
http.listen(PORT, () => {
	console.log('Server is up on port', PORT)
})