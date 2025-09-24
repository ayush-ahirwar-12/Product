const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  try {
    const {
      userName,
      email,
      fullName: { firstName, lastName },
      password,
    } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ userName }, { email }],
    });

    if (isUserAlreadyExists) {
      return res.status(422).json({
        message:
          isUserAlreadyExists.userName == userName
            ? "username already exists"
            : "email already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = userModel.create({
      userName: userName,
      email: email,
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      password: hash,
    });

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY);

    res.cookie("token", token);

    res.status(201).json({
      message: "user created successfully",
      userName: userName,
      email: email,
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      password: hash,
    });
  } catch (error) {
    console.log("error-->", error);
  }
}

async function loginUser(req, res) {
  try {
    const { userName, email, password } = req.body;
    const user = await userModel.findOne({
      $or: [{ email }, { userName }],
    });
    if (!user) {
      res.status(400).json({
        message: "Invalid Credentials",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: "none",
    });
    return res.status(200).json({
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    console.log("login error-->", error);
  }
}

async function registerSeller(req, res) {
  const seller = await userModel.findByIdAndUpdate(req.user._id, {
    role: "seller",
  });

  res.status(200).json({
    message: "Seller updated successfully",
    seller: {
      id: seller._id,
      username: seller.userName,
      email: seller.email,
      fullName: seller.fullName,
      role: seller.role,
    },
  });
}

async function logoutUser(req, res) {
  try {
    let token = req?.cookies?.token;
    if (!token) {
      res.status(404).json({ message: "token not found" });
    }

    res.clearCookie("token");

    res.status(200).json({
      message: "user logout successfully",
    });
  } catch (error) {
    res.status(401).json({
      message: "error in user logout",
    });
  }
}

module.exports = { registerUser, loginUser, registerSeller, logoutUser };
