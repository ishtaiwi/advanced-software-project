const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.header('Authorization');

    const token = authHeader?.split(' ')[1];

    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (allowedRoles.length && !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ msg: 'Access denied:insufficient role' });
      }

      next();
    } catch (err) {
      return res.status(401).json({ msg: 'Invalid token' });
    }
  };
};
