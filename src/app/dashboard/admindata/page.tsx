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
  return (
    <div className="relative left-16 bg-slate-200 h-screen">
      <AdminsData admins={admins} />
    </div>
  );
};

export default AdminPage;
