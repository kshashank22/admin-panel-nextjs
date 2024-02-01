"use client";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { FaUser, FaUsers } from "react-icons/fa6";
import { RiAdminFill, RiUserAddFill } from "react-icons/ri";

const DashboardDetails = () => {
  return (
    <div className="flex">
      {[
        {
          text: "My Profile",
          icon: <FaUser size={"5rem"} />,
          link: "/dashboard/myprofile",
        },
        {
          text: "Add Users",
          icon: <RiUserAddFill size={"5rem"} />,
          link: "/dashboard/addUser",
        },
        {
          text: "Users Data",
          icon: <FaUsers size={"5rem"} />,
          link: "/dashboard/userdata",
        },
        {
          text: "Admins Data",
          icon: <RiAdminFill size={"5rem"} />,
          link: "/dashboard/admindata",
        },
      ].map((items, index) => (
        <Link href={items.link} key={index}>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                }}
              >
                {items.icon}
              </ListItemIcon>
              <ListItemText primary={items.text} />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </div>
  );
};

export default DashboardDetails;
