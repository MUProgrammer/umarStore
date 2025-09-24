import express from "express";
import {
  createdUser,
  deleteUserById,
  forgetPassword,
  getAllUsers,
  getCurrentUserProfile,
  getUserById,
  loginUser,
  logoutCurrentUser,
  resetPassword,
  updateCurrentUser,
  updateUserById,
  uploadProfilePic,
} from "../controller/user.controller.js";
import { authenticate, authorized } from "../middlewares/authMIddleware.js";
const router = express.Router();

router
  .route("/")
  .post(uploadProfilePic, createdUser)
  .get(authenticate, authorized, getAllUsers); // Admin route for get All users
router.route("/auth").post(loginUser);
router.route("/logout").post(logoutCurrentUser);
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, uploadProfilePic, updateCurrentUser);
router.route("/forgetPassword").post(forgetPassword);
router.route("/resetPassword/:token").post(resetPassword);

// Admin Routes
router
  .route("/:id")
  .delete(authenticate, authorized, deleteUserById)
  .get(authenticate, authorized, getUserById)
  .put(authenticate, authorized, uploadProfilePic, updateUserById);
export default router;
