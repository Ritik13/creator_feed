import jwt from 'jsonwebtoken';

export const authMiddleWare = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.info('AuthMiddle pass')
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
}


export function checkRoleMDL(requiredRole) {
    return function(req, res, next) {
      if (!req.user || req.user.role !== requiredRole) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      next();
    }
  }
