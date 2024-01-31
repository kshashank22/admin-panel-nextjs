"use client";
import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import Link from "next/link";

type Person = {
  firstname: string;
  lastname: string;
  email: string;
  fathersname: string;
  mothersname: string;
  address: string;
  pincode: string;
  city: string;
  country: string;
  photo: string;
};

const UsersData = () => {
  const [userData, setUserData] = useState<Person[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const getResponse: any = await fetch("../api/getUserApi", {
          method: "GET",
        });
        const res = await getResponse.json();
        setUserData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "firstname",
        header: "FirstName",
        size: 150,
      },
      {
        accessorKey: "lastname",
        header: "LastName",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "fathersname",
        header: "FathersName",
        size: 150,
      },
      {
        accessorKey: "mothersname",
        header: "MothersName",
        size: 200,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 150,
      },
      {
        accessorKey: "pincode",
        header: "Pincode",
        size: 150,
      },
      {
        accessorKey: "city",
        header: "City",
        size: 150,
      },
      {
        accessorKey: "country",
        header: "Country",
        size: 150,
      },
      {
        accessorKey: "photo",
        header: "Photo",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: userData,
  });

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default UsersData;
