import { Request, Response } from 'express';

const errorHandler = (req: Request, res: Response): Response => {
    return res.status(404).json({ message: 'Not valid request' });
};

export default errorHandler;
