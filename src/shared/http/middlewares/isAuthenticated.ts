import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { Secret, verify } from "jsonwebtoken";
import authConfig from '@config/auth';



interface TokenPayload{
    iat: number;
    exp: number;
    sub: string;
}


export default function isAuthenticated(

    request: Request,
    response: Response,
    next: NextFunction,

): void{

    const authHeader = request.headers.authorization;

    if(!authHeader){

        throw new AppError('JWT token is missing');
    }

    //Bearer asdkfhskdfhaksdfalskdjfhsalk
    const [, token] = authHeader.split(' ');

    try{

        const decodeToken = verify(token, authConfig.jwt.secret as Secret);

        const { sub} = decodeToken as TokenPayload;
        //console.log(decodeToken);

        request.user = {
            id: sub,
        }

        return next();
    } catch {
        throw new AppError('Invalid JWT token')
    }

}

