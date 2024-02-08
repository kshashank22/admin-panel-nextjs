import { connectMongoDB } from "@/mongoose/MongoDB";
import { NextResponse } from "next/server";
import { genSaltSync, hashSync } from "bcrypt-ts";
import User from "@/models/RegisterSchema";
import AllData from "@/models/DataSchema";

export const PUT = async (req: any) => {
  try {
    const { email, password, confirmpassword } = await req.json();
    await connectMongoDB();
    const salt = genSaltSync(10);
    const user = await AllData.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { errors: "Email Doesn't Exist" },
        { status: 400 }
      );
    }
    const upadatedUser = await AllData.findByIdAndUpdate(
      user.id,
      {
        password: hashSync(password, salt),
        confirmpassword: hashSync(confirmpassword, salt),
      }
    );
    return NextResponse.json("User Updated successfully", upadatedUser);
  } catch (error) {
    return NextResponse.json(
      { message: "An Error Occured While Reseting the Password." },
      { status: 500 }
    );
  }
};
