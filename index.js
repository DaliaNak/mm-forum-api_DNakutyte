import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import questionRouter from "./src/routes/question.js";
import userRouter from "./src/routes/user.js";

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected to DB!"))
  .catch((err) => {
    console.log(err);
  });

app.use(userRouter);
app.use(questionRouter);

app.listen(process.env.PORT);
