import ExampleWithProviders from "@/components/usersData/UsersData";
import axiosInstance from "@/utilities/axiosInstance";
import React from "react";

export async function getUsers(start:any,size:any) {
  const getResponse = await axiosInstance.get(`/api/getUserApi?page=${start}&limit=${size}`);
  return getResponse.data.data;
}

export function getUsersData(){
  const url = new URL(
    `/api/getUserApi`,
    process.env.REACT_APP_BASE_URL === "production"
      ? "https://www.material-react-table.com"
      : "http://localhost:3000"
  );
  console.log(url,"gvhbjnkm")
  return url
}

const Userpage = async () => {
  //const users = await getUsers();
  return (
    <div className="relative">
      <ExampleWithProviders />
    </div>
  );
};

export default Userpage;
