import { Request, Response, NextFunction} from 'express'
import { getToken, loggedUser } from '../utils/getCookie';


const roleAuthorization = (allowedRoles: ('manager' | 'leader' | 'member')[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = getToken(req)
  const { userRole } = loggedUser(decodedToken);

    if (!decodedToken) {
      return res.status(401).send({ message: "Token not provided" });
    }

    try {
      
      if (req.userRole && !allowedRoles.includes(userRole)) {
        return res.status(403).send({ message: "Access forbidden: Role not allowed" });
      }

      next();
    } catch (error) {
      res.status(401).send({ message: "Invalid token" });
    }
  };
};

export default roleAuthorization