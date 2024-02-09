import AllData from "@/models/DataSchema";
import { NextResponse } from "next/server";

export const DELETE = async (req: any) => {
  const email = await req.json();
  try {
    await AllData.deleteOne({ email });
    return NextResponse.json(
      { errors: "Successfully Deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An Error Occured While Reseting the Password." },
      { status: 500 }
    );
  }
};
