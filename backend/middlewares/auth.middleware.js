import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return next(new AuthorizationError("No token provided"));
    }

    const token = authHeader.split(" ")[1];

    // const isBlackListed = await redisClient.get(token);
    // if (isBlackListed) {
    // res.cookie("token", "");
    // return next(new AuthorizationError("Unauthorized Please login !"));
    // }

    if (!token) {
      return next(new AuthorizationError("Unauthorized Please login !"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return next(new AuthorizationError("Unauthorized Please login !"));
  }
};
