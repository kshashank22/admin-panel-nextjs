import { connectMongoDB } from "@/mongoose/MongoDB";
import { NextResponse } from "next/server";
import { genSaltSync, hashSync } from "bcrypt-ts";
import User from "@/models/RegisterSchema";

export const PUT = async (req: any) => {
  try {
    const { email, password, confirmpassword } = await req.json();
    await connectMongoDB();
    const salt = genSaltSync(10);
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { errors: "Email Doesn't Exist" },
        { status: 400 }
      );
    }
    const upadatedUser = await User.findByIdAndUpdate(
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
