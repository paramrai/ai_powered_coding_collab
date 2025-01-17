import jwt from "jsonwebtoken";
import { AuthenticationError } from "../utils/errorClass.js";

export const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return next(new AuthenticationError("No token provided"));
    }

    const token = authHeader.split(" ")[1];

    // const isBlackListed = await redisClient.get(token);
    // if (isBlackListed) {
    // res.cookie("token", "");
    // return next(new AuthenticationError("Unauthorized Please login !"));
    // }

    if (!token) {
      return next(new AuthenticationError("Unauthorized Please login !"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return next(new AuthenticationError("Unauthorized Please login !"));
  }
};
