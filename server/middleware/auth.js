import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // ✅ Ensure proper case
  console.log("🔹 Received Auth Header:", authHeader); // 🔥 Debugging

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error("❌ No token or incorrect format provided");
    return res.status(401).json({ message: 'Access denied. No valid token provided.' });
  }

  const token = authHeader.split(' ')[1]; // ✅ Safer extraction
  console.log("🔹 Extracted Token:", token); // 🔥 Debugging

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("✅ Decoded Token:", decoded); // 🔥 Debugging
    next();
  } catch (error) {
    console.error("❌ Invalid Token Error:", error); // 🔥 Debugging
    res.status(401).json({ message: 'Invalid token.' });
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    console.error("❌ Unauthorized Access - Not Admin");
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
};

// import jwt from 'jsonwebtoken';

// export const verifyToken = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     console.log("Decoded Token:", decoded); // 🔥 Debugging step

//     next();
//   } catch (error) {
//     res.status(400).json({ message: 'Invalid token.' });
//   }
// };

// export const isAdmin = (req, res, next) => {
//   if (!req.user.isAdmin) {
//     return res.status(403).json({ message: 'Access denied. Admin only.' });
//   }
//   next();
// };