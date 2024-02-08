import { connectMongoDB } from "@/mongoose/MongoDB";
import { NextResponse } from "next/server";
import UserData from "@/models/UsersRegisterSchema";
import AllData from "@/models/DataSchema";
import { genSaltSync, hashSync } from "bcrypt-ts";

export async function POST(req: any) {
  try {
    const salt = genSaltSync(10);
    const {
      name,
      email,
      password,
      confirmpassword,
      address,
      city,
      role
    } = await req.json();
    await connectMongoDB();
    const user = await AllData.findOne({ email }).select("_id");
    if (user) {
      return NextResponse.json(
        { errors: "User Already Exist" },
        { status: 400 }
      );
    }
    const data = await AllData.create({
      name,
      email,
      password: hashSync(password, salt),
      confirmpassword: hashSync(confirmpassword, salt),
      address,
      city,
      role
    });

    return NextResponse.json(
      { message: "User Registered.", data: data },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An Error Occured While Registering the User." },
      { status: 500 }
    );
  }
}
