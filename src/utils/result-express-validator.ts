import { validationResult } from 'express-validator';
import { Request, Response } from 'express';

// ! FIX BUG: Understanding Node Error [ERR_HTTP_HEADERS_SENT]
// ? https://www.codementor.io/@oparaprosper79/understanding-node-error-err_http_headers_sent-117mpk82z8

const errors = (req: Request, res: Response, statusCode: number) => {
    const errorsResult = validationResult(req);

    // Array with all errors
    const errorFormatter = ({ msg, param }: { msg: string; param: string }) => {
        return `${param} : ${msg}`;
    };

    if (!errorsResult.isEmpty()) {
        const result = validationResult(req).formatWith(errorFormatter);
        return res.status(statusCode).json({ errors: result.array() });
    }

    return true;
};

export default errors;
