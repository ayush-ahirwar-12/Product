const express = require("express")
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { authUser, authSeller } = require("../middlewares/auth.middleware");




router.get("/me", authUser, (req, res) => {
  return res.status(200).json({ message: "User logged in", user: req.user });
});

router.post("/user/register",authController.registerUser);

router.post("/user/login",authController.loginUser);

router.get("/user/logout",authController.logoutUser)

router.patch("/seller/register",authSeller,authController.registerSeller);






module.exports=router;