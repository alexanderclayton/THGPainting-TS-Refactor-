import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request } from 'express';

dotenv.config();

const secret = process.env.SECRET as string;
const expiration = "2h";

interface DecodedUser {
    email: string;
    name: string;
    _id: string;
};

interface AuthRequest extends Request {
    user?: DecodedUser;
};

export const authMiddleware = (req: AuthRequest): AuthRequest => {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.headers.authorization;

    if (req.headers.authorization) {
        token = token?.split(" ").pop()?.trim();
    }

    if (!token) {
        return req;
    }

    // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
    try {
        const {data} = jwt.verify(token, secret, { maxAge: expiration }) as { data: DecodedUser };
        req.user = data;
        console.log("authMiddleware:", req.user)
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Invalid token");
        } else {
            throw error;
        }
    }

    // return the request object so it can be passed to the resolver as `context`
    return req;
};

export const signToken = ({ email, name, _id }: DecodedUser): string => {
    const payload = { email, name, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};