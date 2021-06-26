const express = require('express')
require('./db/mongoose.ts')
const app = express()
const http = require('http').createServer(app)
const usersRouter = require('./routers/users.ts')
app.use(usersRouter);

const PORT = 3000
http.listen(PORT, () => {
	console.log('Server is up on port', PORT)
})