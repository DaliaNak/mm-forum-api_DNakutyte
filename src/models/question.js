import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  question_text: { type: String, required: true, minlength: 3 },
  description: { type: String, required: true, minlength: 3 },
  date: { type: Date, required: true },
  userId: { type: String, required: true, minlength: 3 },
});

export default mongoose.model("Question", questionSchema);
