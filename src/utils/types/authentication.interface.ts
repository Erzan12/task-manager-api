import { Request } from "express";
import { RequestUser } from "./request-user.interface";

export interface AuthenticatedRequest extends Request {
    user: RequestUser;
}

export interface JwtPayload {
    userUUID: string;
    tokenVersion: number;
}