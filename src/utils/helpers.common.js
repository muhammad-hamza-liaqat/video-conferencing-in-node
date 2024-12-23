import { HTTPError } from "./response.js";
import statusCode from "http-status-codes"

export const validationCatches = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            errors: error.inner.map((err) => ({
                path: err.path,
                message: err.message,
            })),
        });
    }
};



export const catchAsyncErrors = (action) => async (req, res, next) => {
    try {
        await action(req, res, next);
    } catch (error) {
        console.log("catchAsyncErrors ==>", error);
        const err = new HTTPError(
            "Internal Server Error",
            statusCode.INTERNAL_SERVER_ERROR,
            error.message
        );
        res.status(statusCode.INTERNAL_SERVER_ERROR).json(err);
    }
};