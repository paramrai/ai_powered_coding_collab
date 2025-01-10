import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // const isBlackListed = await redisClient.get(token);

    // if (isBlackListed) {
    //   res.cookie("token", "");

    //   return res.status(401).send({ error: "Unauthorized User" });
    // }

    if (!token) {
      return res.status(401).send({ error: "Unauthorized User" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: "Unauthorized User" });
  }
};
