import AdminsData from "@/components/adminsData/AdminsData";
import axiosInstance from "@/utilities/axiosInstance";
import React from "react";

async function getAdmins() {
  const getResponse = await axiosInstance("/api/getAdminApi", {
    method: "GET",
  });
  return getResponse.data.data;
}

const AdminPage = async () => {
  const admins:any = await getAdmins();
  const filterAdmins:any=admins.filter((e:any)=>e.role==="Admin")
  return (
    <div className="relative">
      <AdminsData admins={filterAdmins} />
    </div>
  );
};

export default AdminPage;
