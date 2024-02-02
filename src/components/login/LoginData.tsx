"use client";

import { LoginDetails, loginValidateSchema } from "@/utilities/utilities";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import { cookies } from "next/headers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginData = () => {
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const routing = useRouter();
  // const cookie=cookies()
  // const token=cookie.get("token")

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik<any>({
    initialValues: initialValues,
    validationSchema: loginValidateSchema,
    onSubmit: async (values: any) => {
      setError("");
      setLoader(true);
      try {
        const response = await fetch("api/loginApi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const res = await response.json();
        if (response.ok) {
          if (res.token) {
            localStorage.setItem("name", JSON.stringify(res.user));
            localStorage.setItem("role", JSON.stringify(res.role));
            formik.resetForm();
            routing.push("/dashboard");
            setLoader(false);
          }else{
            setLoader(false);
            setError("Token is Not Generated");
          }
        } else {
          setLoader(false);
          setError(res.error);
        }
      } catch (error: any) {
        setLoader(false);
        console.log("Error During Login:", error);
      }
    },
  });
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-slate-600">
      <div className="rounded bg-slate-100 p-5 xl:w-[30%]">
        <h1 className="text-center text-3xl font-semibold">Login</h1>
        <form onSubmit={formik.handleSubmit} className="gap-10">
          {LoginDetails.map((e, i) => (
            <div key={i} className="m-5">
              <label className="text-slate text-md font-medium" htmlFor={e.id}>
                {e.text}
              </label>
              <div className="mt-2">
                <input
                  type={e.type}
                  id={e.id}
                  className="sm:w-[250px] xl:w-[100%] p-[8px]"
                  placeholder={`Enter the ${e.text}`}
                  value={formik.values[e.id]}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched[e.id] && formik.errors[e.id] ? (
                <p className="text-red-700 text-md font-semibold mt-1">
                  {formik.errors[e.id]}
                </p>
              ) : null}
            </div>
          ))}
          <div className="m-5">
            <p className="cursor-pointer text-sm">Forgot the Password?</p>
          </div>
          <div className="text-center">
            <button
              className="bg-slate-600 rounded text-slate-100 p-2 w-[80px]"
              type="submit"
            >
              {loader ? (
                <CircularProgress size={"1rem"} color="inherit" />
              ) : (
                "Login"
              )}
            </button>
          </div>
          <div className="m-5">
            <Link href={"/register"}>
              <p className="text-slate text-sm cursor-pointer">
                Doesn't Have Account? Register Here
              </p>
            </Link>
          </div>
          {error && (
            <div className="m-5">
              <p className="text-red-700 text-md font-semibold mt-1">{error}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginData;
