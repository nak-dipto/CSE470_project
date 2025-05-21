import mongoose from "mongoose";
// mongoose.connect(process.env.DATABASE_URL);
mongoose.Promise = global.Promise;

const ItemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    isGift: { type: Boolean, required: true },
    items: { type: [ItemSchema], required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
