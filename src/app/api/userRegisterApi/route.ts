import { connectMongoDB } from "@/mongoose/MongoDB";
import { NextResponse } from "next/server";
import UserData from "@/models/UsersRegisterSchema";

export async function POST(req: any) {
  try {
    const {
      firstname,
      lastname,
      email,
      fathersname,
      mothersname,
      address,
      city,
      pincode,
      country,
      photo,
    } = await req.json();
    await connectMongoDB();
    const user = await UserData.findOne({ email }).select("_id");
    if (user) {
      return NextResponse.json(
        { errors: "User Already Exist" },
        { status: 400 }
      );
    }
    const data = await UserData.create({
      firstname,
      lastname,
      email,
      fathersname,
      mothersname,
      address,
      city,
      pincode,
      country,
      photo,
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
