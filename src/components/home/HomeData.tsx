"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RiAdminFill } from "react-icons/ri";
import { RiUserAddFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import AdminPage from "@/app/dashboard/admindata/page";
import Userpage from "@/app/dashboard/userdata/page";
import AddUserPage from "@/app/dashboard/addUser/page";

const HomeData = () => {
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState("home");
  const routing = useRouter();
  const pathname = usePathname();


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

  const renderComponent = () => {
    switch (currentPage) {
      case "home":
        return <div>Admin Page</div>;
      case "home/addUser":
        return <AddUserPage />;
      case "home/user":
        return <Userpage />;
      case "home/admin":
        return <AdminPage />;
      default:
        return <div>Page not found</div>;
    }
  };

  // const updatePath = (page:any) => {
  //   setCurrentPage(page);
  //   routing.push(`${page}`);
  // };

  return (
    <div className="bg-slate-200 h-[100vh]">
      <div className="flex ">
        <div className="bg-blue-300 flex h-[100vh] w-[20vw] flex-col">
          {/* <Link href={"home/addUser"} as={"home/addUser"}> */}
            <div className="flex m-10" onClick={() => setCurrentPage ("home/addUser")}>
              <div>
                <RiUserAddFill size={"2rem"} />
              </div>
              <p className="text-slate-900 text-xl ml-3">Add User</p>
            </div>
          {/* </Link> */}

          {/* <Link href={"home/user"} as={"home/user"}> */}
            <div className="flex m-10" onClick={() => setCurrentPage ("home/user")}>
              <div>
                <FaUsers size={"2rem"} />
              </div>
              <p className="text-slate-900 text-xl ml-3">Users Data</p>
            </div>
          {/* </Link> */}

          {/* <Link href={"home/admin"} as={"home/admin"}> */}
            <div className="flex m-10" onClick={() => setCurrentPage ("home/admin")}>
              <div>
                <RiAdminFill size={"2rem"} />
              </div>
              <p className="text-slate-900 text-xl ml-3">Admin Data</p>
            </div>
          {/* </Link> */}
        </div>
        <div>
          <div className="bg-blue-200 flex h-[10vh] w-[80vw] flex-col">
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
          <div className="bg-blue-100 overflow-auto h-[90vh] w-[80vw] text-2xl">
            {renderComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeData;
