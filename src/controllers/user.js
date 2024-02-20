import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const SIGN_UP = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  const correctedName = req.body.name
    .split(" ")
    .map((word) => capitalizeFirstLetter(word))
    .join(" ");

  try {
    const user = new UserModel({
      name: correctedName,
      email: req.body.email,
      password: hash,
    });

    if (!req.body.email.includes("@")) {
      return res.status(401).json({
        message: "Invalid email, please include the '@' symbol.",
      });
    }

    if (req.body.password.length < 8 || !/\d/.test(req.body.password)) {
      return res.status(401).json({
        message:
          "Password must be at least 8 characters long and contain at least one number.",
      });
    }

    const response = await user.save();

    return res.status(201).json({
      message: "User created successfully",
      user: response,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong on the server" });
  }
};

const LOGIN = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({
        message:
          "Authentication failed. Please ensure you are using a valid email address.",
      });
    }

    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        message:
          "Authentication failed. Please ensure you are using a valid password.",
      });
    }

    const jwtToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.status(200).json({ jwt: jwtToken });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong on the server." });
  }
};

export { SIGN_UP, LOGIN };
