import User from "@/models/RegisterSchema";
import { NextResponse } from "next/server";
import { compareSync } from "bcrypt-ts";
import { connectMongoDB } from "@/mongoose/MongoDB";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import AllData from "@/models/DataSchema";

export async function POST(req: any) {
  try {
    await connectMongoDB();
    const { email, password } = await req.json();
    const user = await AllData.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Incorrect Email and Password" },
        { status: 404 }
      );
    }
    const bcryptpass = compareSync(password, user.password);
    if (!bcryptpass) {
      return NextResponse.json(
        { error: "Incorrect Email and Password" },
        { status: 404 }
      );
    }
    const authToken = jwt.sign({ id: user.id,email:user.email,name:user.name,role:user.role }, `${process.env.SECRET_KEY}`);
   cookies().set('token',authToken)
    return NextResponse.json(
      {
        success: "Login successfully",
        user: user.name,
        role: user.role,
        token: authToken,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Error Occured." },
      { status: 500 }
    );
  }
}
