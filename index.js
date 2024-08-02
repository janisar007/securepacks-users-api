import express from "express";
import dotenv from "dotenv";
// import connectDB from "../config/db.js";
import authRouter from "./routes/auth.route.js";
// import securepacksUsersRouter from "./routes/securepacksusers.route.js";
// import userRouter from "./routes/user.route.js";
// import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser"; //initilaize it in the middleware section
import { connectDB } from "./database/db.js";
import securepacksUsersRouter from "./routes/securepacksusers.route.js";
// import connectDB from "./database/db.js";
import cors from 'cors'

const app = express();
app.use(cors());

// import path from "path";

//configure env
dotenv.config();

//database config->
connectDB();

//rest object


//middlewares
app.use(express.json());

app.use(cookieParser()); //to access cookie data in the project.

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});

//routes
// app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", securepacksUsersRouter);
// app.use("/api/listing", listingRouter);

// app.use(express.static(path.join(__dirname, "/client/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });


//Middleware for 500 error ->
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.log(err);
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
