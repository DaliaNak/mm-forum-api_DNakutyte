import QuestionModel from "../models/question.js";

const GET_ALL_QUESTIONS = async (req, res) => {
  try {
    const questions = await QuestionModel.find();
    return res.status(200).json({ questions: questions });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong on the server" });
  }
};

const GET_QUESTION_BY_ID = async (req, res) => {
  try {
    const question = await QuestionModel.findById(req.params.id);
    return res.status(200).json({ question: question });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong on the server" });
  }
};

const GET_ALL_QUESTIONS_BY_USER_ID = async (req, res) => {
  try {
    const question = await QuestionModel.find({ userId: req.body.userId });
    return res.status(200).json({ question: question });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong on the server" });
  }
};

const ADD_QUESTION = async (req, res) => {
  try {
    const currentDate = new Date();

    const question = new QuestionModel({
      question_text: req.body.question_text,
      description: req.body.description,
      date: currentDate,
      userId: req.body.userId,
    });

    const response = await question.save();

    return res
      .status(201)
      .json({ message: "Question added successfully", response: response });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong on the server" });
  }
};

const DELETE_QUESTION_BY_ID = async (req, res) => {
  try {
    const question = await QuestionModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ question: question });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong on the server" });
  }
};

export {
  GET_ALL_QUESTIONS,
  GET_QUESTION_BY_ID,
  GET_ALL_QUESTIONS_BY_USER_ID,
  ADD_QUESTION,
  // LIKE_QUESTION,
  // DISLIKE_QUESTION,
  DELETE_QUESTION_BY_ID,
};
