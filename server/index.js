import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotEnv from "dotenv";
import postsRoute from "./routes/post.js";
import authRoute from "./routes/auth.js";
import bcrypt from "bcryptjs";
//initialising dotenv
dotEnv.config();

//initialising app and port
const app = express();
const port = 5000 || process.env.PORT;

//initialising middlewares
app.use(cors());
app.use(express.json());

//listening to endpoints
app.use("/post", postsRoute);
app.use("/auth", authRoute);

//connecting to server using mongoose
mongoose
  .connect("mongodb://localhost:27017/CrackTheWebDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(port, () => {
      console.log("connected to server using port =", port);
    })
  )
  .catch((err) => console.log(err));
