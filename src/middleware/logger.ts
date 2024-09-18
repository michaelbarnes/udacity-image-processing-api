import { Request, Response } from "express";

export const logger = (req: Request, res: Response, next: () => void) => {
	console.log(
		`[${new Date().toUTCString()}] Incoming Request ${req.ip} | ${req.method}: '${req.path}' Query: ${JSON.stringify(req.query)}`,
	);
	next();
};
