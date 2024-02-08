import { connectMongoDB } from "@/mongoose/MongoDB";
import { NextResponse } from "next/server";
import { genSaltSync, hashSync } from "bcrypt-ts";
import User from "@/models/RegisterSchema";
import AllData from "@/models/DataSchema";

export async function POST(req: any) {
  await connectMongoDB();
  try {
    const salt = genSaltSync(10);
    const { name, email, password, confirmpassword, role } = await req.json();
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
      role,
      password: hashSync(password, salt),
      confirmpassword: hashSync(confirmpassword, salt),
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
