import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { config } from "dotenv";
config();

const JWTSecret = process.env.SECRET_JWT_KEY;

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      JWTSecret
    );
  } catch (error) {}
};

export const signup = () => {};
