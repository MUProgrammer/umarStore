import User from "../models/user.model.js";
import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";
// authenticate the user is logedIn
const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  // check the the condition if token is provided
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized  Token Failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized No Token Provided");
  }
});

// authorized admin
const authorized = asyncHandler(async (req, res, next) => {
  // check the condition if user login or isAdmin
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("No authorized as a  Admin");
  }
});
export { authenticate, authorized };
