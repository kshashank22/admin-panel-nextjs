import mongoose, { Schema, models } from "mongoose";

const UsersRegisterSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    fathersname: {
      type: String,
      required: true,
    },
    mothersname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const UserData =
  models.UserData || mongoose.model("UserData", UsersRegisterSchema);
export default UserData;
