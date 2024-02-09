import mongoose, { Schema, models } from "mongoose";

const DataSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required:true,
    },
    confirmpassword: {
      type: String,
      required: true,
    },
    role: {
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
  },
  { timestamps: true }
);

const AllData = models.AllData || mongoose.model("AllData", DataSchema);
export default AllData;
