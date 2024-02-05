"use client";

import React from "react";
import { jwtDecode } from "jwt-decode";

const Profile = ({ details }: any) => {
  const { email, iat,name } = jwtDecode(details.value);

  return (
    <div className="pt-5 ml-16 text-xl">
      <h1 className="text-center">My Details</h1>
      <div className="flex justify-between text-slate-600">
       <div>
       <p>
          Email:<span className="text-slate-900 font-semibold">{email}</span>
        </p>
        <p>
          Name:<span className="text-slate-900 font-semibold">{name}</span>
        </p>
       </div>
        <p>
          id:<span className="text-slate-900 font-semibold">{iat}</span>
        </p>
      </div>
    </div>
  );
};

export default Profile;
