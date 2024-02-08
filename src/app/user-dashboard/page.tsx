import UserDashboard from "@/components/user-dashboard/UserDashboard";
import axiosInstance from "@/utilities/axiosInstance";
import React from "react";

async function getAdmins() {
  const getResponse = await axiosInstance("/api/getUserApi", {
    method: "GET",
  });
  return getResponse.data.data;
}

const UserDashboardPage = async () => {
  const users:any = await getAdmins();
  console.log(users)
  const filterUser:any=users.filter((e:any)=>e.role==="User")
  return (
    <div className="relative">
      <UserDashboard users={filterUser} />
    </div>
  );
};

export default UserDashboardPage;
