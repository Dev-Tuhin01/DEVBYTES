import express from "express";
import authRouter from "./Routes/auth.route.ts";
import blogRouter from "./Routes/blog.route.ts";
import miscRouter from "./Routes/misc.route.ts";

const app = express();

app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/blog",blogRouter);
app.use("/api/misc",miscRouter);

export default app;