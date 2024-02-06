import UserData from "@/models/UsersRegisterSchema";
import { NextResponse } from "next/server";

export async function GET(request:any) {
  try {
    const page: number = parseInt(
      request.nextUrl.searchParams.get("page") ?? "1",
      1
    );
    const limit: number = parseInt(
      request.nextUrl.searchParams.get("limit") ?? "10",
      10
    );
    const pageNumber = isNaN(page) ? 1 : page;
    const limitNumber = isNaN(limit) ? 10 : limit;

    if (isNaN(pageNumber) || isNaN(limitNumber)) {
      console.log("Invalid page or limit parameter");
      throw new Error("Invalid page or limit parameter");
    }

    const skip = (pageNumber - 1) * limitNumber;
    const users = await UserData.find().skip(skip).limit(limitNumber);
    const data = await UserData.find();
    return NextResponse.json(
      { message: "Successfully Fetched.", data: users },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error Occured While Getting the User." },
      { status: 500 }
    );
  }
}
