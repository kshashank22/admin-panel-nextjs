"use client";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

type Person = {
  name: string;
  email: string;
  address: string;
  city: string;
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
    </div>
  );
};

export default UserDashboard;
