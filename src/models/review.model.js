import mongoose from "mongoose";
// mongoose.connect(process.env.DATABASE_URL);
mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.Review || mongoose.model("Review", reviewSchema);
