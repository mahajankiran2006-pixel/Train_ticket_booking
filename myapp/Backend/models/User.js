import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  gender: { type: String, enum: ["male", "female", "other"] },
  dob: { type: Date },
  country: { type: String },
}, { timestamps: true });

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;