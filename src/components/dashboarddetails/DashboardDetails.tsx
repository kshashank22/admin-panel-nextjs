"use client";

import React from "react";
import { FaUser, FaUsers } from "react-icons/fa6";
import { RiAdminFill, RiUserAddFill } from "react-icons/ri";

const Details = [
  {
    title: "Profile",
    summary: "Here Admin get there own information",
    logo: <FaUser size={"2rem"} />,
  },
  {
    title: "Users Data",
    summary:
      "Here we display the infomation of all the users data that stored in database",
    logo: <FaUsers size={"2rem"} />,
  },
  {
    title: "Add Users",
    summary: "Here we add the new user details and will stored in database",
    logo: <RiUserAddFill size={"2rem"} />,
  },
  {
    title: "Admins Data",
    summary:
      "Here we display the infomation of all the admins data that stored in database",
    logo: <RiAdminFill size={"2rem"} />,
  },
];

const DashboardDetails = () => {
  return (
    <div className="bg-slate-200 h-screen overflow-auto pt-20">
      <div className="flex justify-center mb-20">
        <div className="text-center w-[50%] m-auto">
          <h1 className=" text-slate-800 text-2xl font-semibold">
            Admin and User information in one place
          </h1>
          <p className=" text-slate-500 pt-2">
            Simple and intuitive admin panel that consolidates all admins and
            users information into a safe and centralized information store that
            is assible from anywhere. All your employee's data can easily be
            collected, imported and stored in the database.
          </p>
        </div>
      </div>
      <div className=" w-[10%] m-auto md:flex  md:justify-center md:w-[90%]">
        {Details.map((e, i) => (
          <div
            className="flex flex-col justify-center items-center m-10"
            key={i}
          >
            <div>{e.logo}</div>
            <h1 className=" text-slate-600 text-2xl font-semibold">
              {e.title}{" "}
            </h1>
            <p className="text-center text-slate-500 pt-2">{e.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardDetails;
