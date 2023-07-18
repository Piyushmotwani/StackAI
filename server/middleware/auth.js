// import jwt from "jsonwebtoken";

// const auth = (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       res.status(404).json({ success: false, message: "Login to access" });
//       return;
//     }

//     let decodeData = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decodeData?.id;
//     next();
//   } catch (error) {
//     res.status(404).json({ success: false, message: "Something went wrong" });
//   }
// };

// export default auth;

import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ success: false, message: "Login to access" });
      return;
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodeData?.id;
    req.userEmail = decodeData?.email; // Assuming email is included in the token payload

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default auth;

