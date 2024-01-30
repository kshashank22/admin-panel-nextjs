import User from "@/models/RegisterSchema";
import { NextResponse } from "next/server";
import { compareSync } from "bcrypt-ts";

export async function POST(req: any) {
  try {
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
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
    return NextResponse.json(
      {
        success: "Login successfully",
        user: user.name,
        role:user.role,
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
