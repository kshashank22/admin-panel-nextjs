import mongoose, { Schema, models } from "mongoose";

const DataSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    confirmpassword: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const AllData = models.AllData || mongoose.model("AllData", DataSchema);
export default AllData;
