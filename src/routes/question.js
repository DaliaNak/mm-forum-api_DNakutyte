import express from "express";
import {
  GET_ALL_QUESTIONS,
  GET_QUESTION_BY_ID,
  GET_ALL_QUESTIONS_BY_USER_ID,
  ADD_QUESTION,
  // LIKE_QUESTION,
  // DISLIKE_QUESTION,
  DELETE_QUESTION_BY_ID,
} from "../controllers/question.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/questions", auth, GET_ALL_QUESTIONS);

router.get("/questions/:id", auth, GET_QUESTION_BY_ID);

router.get("/questions/user", auth, GET_ALL_QUESTIONS_BY_USER_ID);

router.post("/questions", auth, ADD_QUESTION);

// router.post("/questions/:id/like", LIKE_QUESTION);

// router.post("/questions/:id/dislike", DISLIKE_QUESTION);

router.delete("/questions/:id", auth, DELETE_QUESTION_BY_ID);

export default router;
