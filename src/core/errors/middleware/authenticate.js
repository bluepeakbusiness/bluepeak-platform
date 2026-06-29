import jwt from "jsonwebtoken";

import prisma from "../../config/prisma.js";

export default async function authenticate(req, res, next) {

  try {

    const authHeader = req.headers.authorization;

    if (!authHeader)
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await prisma.user.findUnique({

      where: {

        id: decoded.userId,

      },

    });

    if (!user)
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });

    req.user = user;

    next();

  } catch {

    return res.status(401).json({

      success: false,

      message: "Unauthorized",

    });

  }

}