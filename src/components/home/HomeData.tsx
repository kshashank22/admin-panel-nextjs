"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AddUserData from "../addUser/AddUserData";
import AddUserPage from "@/app/home/addUser/page";

const HomeData = () => {
  const [name, setName] = useState("");
  const routing = useRouter();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("name"));
    if (data) {
      setName(data);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    routing.push("/login");
  };

  return (
    <div className="bg-slate-200 h-[100vh]">
      <div className="h-[12vh] bg-blue-300">
        <div className="text-end p-5 ">
          <p className="text-xl text-md">
            Hello,
            <span className="text-xl text-md font-semibold">
              {name && name}
            </span>
          </p>
          <div className="m-1">
            <button
              className="bg-red-500 rounded text-slate-100 p-2 w-[80px] text-md"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="flex ">
      <div className="bg-blue-500 flex h-[88vh] w-[20vw] flex-col">
        <Link href={'home/addUser'}>
        <p className="text-slate-900 text-center mt-2">Add User</p>
        </Link>
      </div>
      <div className="bg-blue-200 flex h-[88vh] w-[80vw] flex-col">
        component
      </div>
      </div>
    </div>
  );
};

export default HomeData;
