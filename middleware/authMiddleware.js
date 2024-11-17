const checkRole = (role) => {
    return (req, res, next) => {
      if (!req.session.user) {
        return res.status(401).json({ error: 'Unauthorized: No session found' });
      }
  
      // Check if the user's role matches the required role
      if (req.session.user.role !== role) {
        return res.status(403).json({ error: 'Forbidden: You do not have permission' });
      }
  
      next(); // User has the correct role, proceed to the next middleware/route
    };
  };
  
  module.exports = checkRole;
  