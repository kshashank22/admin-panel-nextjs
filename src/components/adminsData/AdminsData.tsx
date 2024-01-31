"use client";
import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import Link from "next/link";

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
      {/* <div style={{ textAlign: "center" }}>
        <Link href={"/"}>
          <button
            style={{
              width: "100px",
              padding: "5px",
              marginTop: "5px",
              backgroundColor: "black",
              color: "white",
              cursor: "pointer",
            }}
          >
            Back To Register
          </button>
        </Link>
      </div> */}
    </div>
  );
};

export default AdminsData;
