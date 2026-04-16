import express from "express";
import dotenv from "dotenv";
import authRouter from "./src/modules/auth/auth.route.js";
import dns from "node:dns"
import testRouter from "./src/modules/auth/test/test.route.js";
dotenv.config();

dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/test", testRouter);
export default app;