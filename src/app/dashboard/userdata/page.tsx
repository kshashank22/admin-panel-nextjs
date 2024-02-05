import ExampleWithProviders from "@/components/usersData/UsersData";
import axiosInstance from "@/utilities/axiosInstance";
import React from "react";

async function getUsers() {
  const getResponse = await axiosInstance.get("/api/getUserApi");
  return getResponse.data.data;
}

const Userpage = async () => {
  const users = await getUsers();
  return (
    <div className="relative left-16 bg-slate-200 h-screen">
      <ExampleWithProviders users={users} />
    </div>
  );
};

export default Userpage;
