import * as mongoose from 'mongoose';
import { Company } from 'src/company/interface/company.interface';
const Schema = mongoose.Schema;

export const ProductSchema = new mongoose.Schema({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: Company,
  },
  productName: String,
  productInfo: String,
  weight: Number,
  noOfProducts:Number,
  productType: String,
  cost: Number,
});
