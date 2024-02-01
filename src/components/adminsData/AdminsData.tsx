"use client";
import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

type Person = {
  name: string;
  email: string;
  role: string;
};

const AdminsData = () => {
  const [adminData, setAdminData] = useState<Person[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const getResponse: any = await fetch("../api/getAdminApi", {
          method: "GET",
        });
        const res = await getResponse.json();
        setAdminData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
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
        accessorKey: "role",
        header: "Role",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: adminData,
  });

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default AdminsData;
