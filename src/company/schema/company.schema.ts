import * as mongoose from 'mongoose';

var Address = new mongoose.Schema({
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  pinCode: {
    type: String,
  },
});

export const companySchema = new mongoose.Schema({
  companyName: String,
  companyInfo: String,
  companyEmail: String,
  comapanyPhoneNumber: Number,
  address: Address,
  availableProducts: Array,
});
