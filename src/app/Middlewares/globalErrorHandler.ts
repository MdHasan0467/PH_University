import { NextFunction, Request, Response } from "express"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = 500;
    const message = err.message || "something went wrong"
    return res.status(statusCode).json({
        success: false,
        message,
        error: err
    })
    next()
}

export default globalErrorHandler