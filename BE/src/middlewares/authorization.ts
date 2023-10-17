import { Request, Response, NextFunction} from 'express'
import getCookie from '../utils/getCookie';
import jwt from 'jsonwebtoken'


const roleAuthorization = (allowedRoles: ('manager' | 'leader' | 'member')[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = getCookie(req);
    const decoded: jwt.JwtPayload = jwt.decode(token) as jwt.JwtPayload;

    if (!token) {
      return res.status(401).send({ message: "Token not provided" });
    }

    try {
      req.userId = decoded._id;
      req.username = decoded.username;
      req.userRole = decoded.role;

      if (req.userRole && !allowedRoles.includes(req.userRole)) {
        return res.status(403).send({ message: "Access forbidden: Role not allowed" });
      }

      next();
    } catch (error) {
      res.status(401).send({ message: "Invalid token" });
    }
  };
};

export default roleAuthorization