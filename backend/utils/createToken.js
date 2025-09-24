import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  //Set jwt as on HTTp cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
  return token;
};

export default createToken;
