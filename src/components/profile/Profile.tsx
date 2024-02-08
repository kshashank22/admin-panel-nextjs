import React from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/utilities/axiosInstance";

const Profile = async ({ details }: any) => {
  const { email, id, name }:any = jwtDecode(details.value);

  const fetchImages = async () => {
    try {
      const response = await axiosInstance.get("/api/getImageApi");
      const data = response.data;
      const profileImg = data.images.filter(
        (img: any) => img.name === `${email}.jpg`
      );
      return profileImg;
    } catch (error) {
      console.error("Error fetching images:", error);
      throw error;
    }
  };

  const img = await fetchImages();
  const profileImg = img[0]?.url;

  return (
    <div className="pt-5 text-xl">
      <h1 className="text-center">My Details</h1>
      <div className="md:flex justify-between text-slate-600 sm:flex sm::flex-col mt-5">
        <div>
          <div className="flex">
            <div className="h-[80px] w-[80px] bg-slate-500 rounded-full pt-3 mr-2">
              <img src={profileImg} alt="image" className="rounded-xl" />
            </div>
            <div className="mt-2">
              <p>
                Email:
                <span className="text-slate-900 font-semibold">{email}</span>
              </p>
              <p>
                Name:
                <span className="text-slate-900 font-semibold">{name}</span>
              </p>
            </div>
          </div>
        </div>
        <p>
          id:<span className="text-slate-900 font-semibold">{id}</span>
        </p>
      </div>
    </div>
  );
};

export default Profile;
