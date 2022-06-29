import { expressjwt, Request as JWTRequest } from "express-jwt";
import express from "express"
require("dotenv").config()

export const requireSignin = expressjwt({
    getToken: (req: JWTRequest) => req.cookies.token,
    secret: process.env.JWT_SECRET!,
    algorithms: ["HS256"],
  });