import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_Sign } from "../config/auth/jwt";

declare module 'express' {
  interface Request {
    cookies: {
      [name: string]: string;
    };
  }
}

export const getToken = (req: Request): JwtPayload | null => {
  const token = req.cookies['accessToken'];

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_Sign); 
    return decoded as JwtPayload;
  } catch (error) {
    // Handle token verification errors here
    return null;
  }
};

export const loggedUser = (decodedToken: JwtPayload | null) => {
  return {
    userRole: decodedToken?.role,
    username: decodedToken?.username,
    userId: decodedToken?._id
  };
};
