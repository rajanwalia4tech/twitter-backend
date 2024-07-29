import mongoose from "mongoose";
const tweetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 280,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

tweetSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Tweet = mongoose.model("Tweet", tweetSchema);

export default Tweet;
