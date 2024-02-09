import { NextResponse } from "next/server";
import AllData from "@/models/DataSchema";

export const PUT = async (req: any) => {
  try {
    const { email,address,city,name,_id } = await req.json();
    const idData=await AllData.findOne({_id})
    console.log(idData)
    const user = await AllData.findOne({email });
    if (!user) {
      return NextResponse.json(
        { errors: "Email Doesn't Exist" },
        { status: 400 }
      );
    }
    const upadatedUser = await AllData.findByIdAndUpdate(
      user.id,
      {
        name,address,city
      },
    );
    return NextResponse.json("User Updated successfully", upadatedUser);
  } catch (error) {
    return NextResponse.json(
      { message: "An Error Occured While Reseting the Password." },
      { status: 500 }
    );
  }
};
