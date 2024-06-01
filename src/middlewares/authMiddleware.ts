
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: {
    id: string;
  };
}

const JWT_SECRET = '7gqGgYQ1LzM^&u^%AMO@x!cpTmXivJk8Bfz'; 

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
    console.log('Token not provided');
    return res.status(401).json({ error: 'Unauthorized - Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }; 
    console.log('Decoded token:', decoded); 

    req.user = {
      id: decoded.userId,
    };

    next();
  } catch (err) {
    console.error('Error verifying JWT:', err);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};
