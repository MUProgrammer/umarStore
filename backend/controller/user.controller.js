import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import createToken from "../utils/createToken.js";
import fs from "fs/promises";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

// Fix __dirname for ES Modules

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "../uploads")); // ✅ backend/uploads
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 3 }, // 3MB
});

// ✅ Middleware for image upload
const uploadProfilePic = upload.single("profilePic");

// ✅ Create User with profile pic
const createdUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const profilePic = `/uploads/${req.file?.filename}`;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill all inputs" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePic,
    });

    await newUser.save(); // Save user first

    // Try generating token
    createToken(res, newUser._id);

    return res.status(201).json({
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    // Optional: rollback user creation if token fails
    await User.deleteOne({ email }); // Clean up the saved user
    console.error("User creation failed:", error.message);
    return res
      .status(500)
      .json({ message: "User creation failed. Please try again." });
  }
});

// login User

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Find user by email
  const existingUser = await User.findOne({ email });
  // If user not found
  if (!existingUser) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  // Compare password
  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  // If valid, create token and send response
  createToken(res, existingUser._id);
  res.status(200).json({
    id: existingUser._id,
    username: existingUser.username,
    email: existingUser.email,
    isAdmin: existingUser.isAdmin,
    profilePic: existingUser.profilePic,
  });
});

// logoutCurrentUser
const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "strict", // prevent CSRF
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout Successfully" });
});

// getAll Users (for Admin)
const getAllUsers = asyncHandler(async (req, res) => {
  const user = await User.find({}).select("-password");
  res.json(user);
});

// getCurrentUserProfile
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
    });
  } else {
    res.status(404);
    throw new Error("No User Found");
  }
});

// update current User

const updateCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("No User Found");
  }

  // ✅ Username update
  user.username = req.body.username || user.username;

  // ✅ Email update with duplication check
  if (req.body.email && req.body.email !== user.email) {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      // Delete newly uploaded image (not old one)
      if (req.file) {
        const newPath = path.join(
          __dirname,
          "..",
          `/uploads/${req.file.filename}`
        );
        fs.unlink(newPath, (err) => {
          if (err) {
            console.error(
              "Failed to delete uploaded image due to email conflict:",
              err.message
            );
          }
        });
      }

      res.status(400);
      throw new Error("Email already in use by another account");
    }
    user.email = req.body.email;
  }

  // ✅ Password update
  if (req.body.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
  }

  // Update profile picture if uploaded
  if (req.file) {
    // Delete old profile picture if exists
    if (user.profilePic) {
      const oldPath = path.join(__dirname, "..", user.profilePic); // assuming profilePic = /uploads/filename
      fs.unlink(oldPath, (err) => {
        if (err) {
          console.error("Failed to delete old profile picture:", err.message);
        }
      });
    }

    // Save new profile picture
    user.profilePic = `/uploads/${req.file.filename}`;
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    profilePic: updatedUser.profilePic,
  });
});

// delete User by Id

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (user.isAdmin) {
    res.status(400);
    throw new Error("Cannot delete an Admin");
  }

  if (user.profilePic) {
    const imageName = path.basename(user.profilePic);
    const imagePath = path.join(__dirname, "..", "uploads", imageName);

    console.log("Resolved image path:", imagePath);

    try {
      await fs.access(imagePath); // check existence
      await fs.unlink(imagePath);
      console.log("Image deleted:", imagePath);
    } catch (err) {
      console.error("Image deletion failed:", err.message);
    }
  }

  await user.deleteOne();
  res.status(200).json({ message: "User Deleted Successfully" });
});

// get User By ID

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    // Construct full image URL if needed
    const profilePicUrl = user.profilePic
      ? `${req.protocol}://${req.get("host")}/uploads/${user.profilePic}`
      : null;

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      profilePic: profilePicUrl,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// update User By Id
const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User Not Found");
  }

  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;
  user.isAdmin = req.body.isAdmin || user.isAdmin;

  // ✅ If new image uploaded
  if (req.file) {
    // 🧹 Delete old image
    if (user.profilePic) {
      const oldImagePath = path.join(
        __dirname,
        "..",
        "uploads",
        user.profilePic
      );
      try {
        await fs.access(oldImagePath); // check if file exists
        await fs.unlink(oldImagePath); // delete it
        console.log("Old image deleted:", oldImagePath);
      } catch (err) {
        console.error("Failed to delete old image:", err.message);
      }
    }

    // ✅ Save new image
    user.profilePic = req.file.filename;
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    profilePic: updatedUser.profilePic,
  });
});

// forget Password
const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 mins
  await user.save();

  const resetUrl = `https://yourfrontend.com/reset-password/${resetToken}`;
  await sendEmail(
    user.email,
    "Password Reset",
    `Click here to reset: ${resetUrl}`
  );

  res.status(200).json({ message: "Reset link sent to email" });
});

// reset Password

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const resetToken = req.params.token;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  // 🔐 Hash incoming token
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // 🔍 Find user with matching hashed token and valid expiry
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  console.log("Plain Token:", resetToken);
  console.log("Hashed Token:", hashedToken);

  if (!user) {
    console.log("Token mismatch or expired");
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  // 🔑 Hash new password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  // 🧹 Clear reset fields
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({ message: "Password has been reset successfully" });
});

export default resetPassword;

export {
  createdUser,
  uploadProfilePic,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUser,
  deleteUserById,
  getUserById,
  updateUserById,
  forgetPassword,
  resetPassword,
};
