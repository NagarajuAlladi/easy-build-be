import * as mongoose from 'mongoose';
import { User } from 'src/auth/interface/user.interface';
import { Company } from 'src/company/interface/company.interface';
import { Product } from 'src/product/interface/product.interface';
const Schema = mongoose.Schema;

export const productReviewSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: Company,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: Product,
  },
  customerName: String,
  comment: String,
  rate: 'number',
  reviewDate: {
    type: Date,
    default: new Date(),
  },
});
