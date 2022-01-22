import * as mongoose from 'mongoose';
import { User } from 'src/auth/interface/user.interface';
import { Product } from 'src/product/interface/product.interface';
const Schema = mongoose.Schema;

export const bookingSchema = new mongoose.Schema({
  productId: { type: Schema.Types.ObjectId, ref: Product },
  products: 'number',
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
  bookingDate: {
    type: Date,
    default: new Date(),
  },
  name: String,
  email: String,
  phone: Number,
  totalPrice: {
    deliveryCharges: Number,
    price: Number,
    grandTotal: Number,
  },
});
