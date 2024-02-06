import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookie = cookies();
    cookie.delete("token");
    return NextResponse.json(
      { message: "Successfully Logout." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Error Occured While Getting the Logout." },
      { status: 500 }
    );
  }
}
