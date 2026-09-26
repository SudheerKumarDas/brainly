import express from "express";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes.js";
import memoryRoutes from "./routes/memory.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users",userRoutes);
app.use("/api/v1/memories",memoryRoutes);

export default app;