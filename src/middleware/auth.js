import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const jwtToken = req.headers.authorization;

  if (!jwtToken) {
    return res
      .status(401)
      .json({ message: "Authentication token is not provided." });
  }

  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Authentication token is not valid." });
    }

    req.body.userId = decoded.id;

    return next();
  });
};

export default authUser;
