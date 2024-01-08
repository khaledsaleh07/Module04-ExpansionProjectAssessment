import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./config/database.js";
import { authenticateToken } from "./middleware/auth.js";

//routes
import signInRoute from "./routes/signIn.js";
import userRoutes from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";

//middleware
app.use(express.json());
app.use(cors());
app.use("/api", signInRoute);
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api",  userRoutes);
app.use("/api",  productRoute);

//listen to port
app.listen(process.env.PORT, () => {
    console.log("listening on port", process.env.PORT);
  });