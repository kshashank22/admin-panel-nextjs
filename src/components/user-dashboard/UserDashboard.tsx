"use client";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import axiosInstance from "@/utilities/axiosInstance";

type Person = {
  name: string;
  email: string;
  address: string;
  city: string;
};

const handleLogout = async () => {
  const response = await axiosInstance.post("../api/logoutApi");
  console.log(response);
  if (response.status === 201) {
    window.location.href = "/";
  }
};

const UserDashboard = ({ users }: any) => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 150,
      },
      {
        accessorKey: "city",
        header: "City",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: users,
  });

  return (
    <div>
      <MaterialReactTable table={table} />
      <div className="text-center mt-3">
        <button
          className="bg-slate-600 rounded text-slate-100 p-2 w-[80px]"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
