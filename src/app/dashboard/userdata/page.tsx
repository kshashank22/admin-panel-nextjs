import ExampleWithProviders from "@/components/usersData/UsersData";
import axiosInstance from "@/utilities/axiosInstance";
import React from "react";

async function getUsers() {
  const getResponse = await axiosInstance.get(`/api/getUserApi`);
  return getResponse.data.data;
}

export function getUsersData(pagination:any){
  const url = new URL(
    `/api/getUserApi?page=${pagination.pageIndex}&limit=${pagination.pageSize}}`,
    process.env.REACT_APP_BASE_URL === "production"
      ? "https://www.material-react-table.com"
      : "http://localhost:3000"
  );
  return url
}

const Userpage = async () => {
  const users = await getUsers();
  return (
    <div className="relative">
      <ExampleWithProviders users={users} />
    </div>
  );
};

export default Userpage;
