import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  cpf: String,
  register_code: { type: Number, unique: true },
  description: String,
  password: String,
  location: {
    address: {
      street: String,
      complement: String,
      zipcode: String,
      neighborhood: String,
      city: String,
      country: String,
    },
  },
  corparative_info: {
    office: String,
    dept: String,
    corporative_mail: String,
    sub_dept: String,
  },
  rules: String,
  createdAt: { type: Date, default: Date.now },
});
