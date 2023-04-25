import { Request, Response, NextFunction } from 'express';

interface Client {
    //Define Client interface properties
}

interface ClientRequest extends Request {
    client: Client | null;
    session: any;
    //define a better type for this later
}

export const clientMiddleware = (req: ClientRequest, res: Response, next: NextFunction) => {
    // Check if the session contains client data
    if (req.session.client) {
        req.client = req.session.client;
    } else {
        req.client = null
    }
    next();
};