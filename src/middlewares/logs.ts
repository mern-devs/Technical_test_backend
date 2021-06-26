import { NextFunction, Request, Response } from "express"

function logError (err: Error, req: Request, res: Response, next: NextFunction) {
	console.error(err)
	next(err)
}

function logRequest (req: Request, res: Response, next: NextFunction) {
	console.log('------REQUEST------')
	console.log(`${req.method} ${req.path}`)
	console.log(`Body: ${req.body ? JSON.stringify(req.body) : undefined}`)
	console.log('-------------------\n')
	next()
}

module.exports = {logError, logRequest}
