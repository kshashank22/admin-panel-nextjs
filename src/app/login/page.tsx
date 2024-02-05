import LoginData from "@/components/login/LoginData";
import React from "react";

export async function loginData(values:any) {
  const response = await fetch("api/loginApi", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  return response
}

const LoginPage = () => {
  return (
    <div>
      <LoginData />
    </div>
  );
};

export default LoginPage;
