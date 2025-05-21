import mongoose from "mongoose";
// mongoose.connect(process.env.DATABASE_URL);
mongoose.Promise = global.Promise;

const cartSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
