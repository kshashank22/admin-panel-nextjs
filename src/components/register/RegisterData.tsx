"use client";

import { RegisterDetails, registerValidateSchema } from "@/utilities/utilities";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegisterData = () => {
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const routing = useRouter();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "Admin",
  };

  const formik = useFormik<any>({
    initialValues: initialValues,
    validationSchema: registerValidateSchema,
    onSubmit: async (values) => {
      setLoader(true);
      try {
        const response = await fetch("api/registerApi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const res = await response.json();
        if (res.errors) {
          setLoader(false);
          setError(res.errors);
          return;
        }
        if (response.ok) {
          formik.resetForm();
          routing.push("/login");
          setLoader(false);
        } else {
          setLoader(false);
          setError("User Registration Failed");
        }
      } catch (error: any) {
        setLoader(false);
        console.log("Error During Registration:", error);
      }
    },
  });
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-[100vh] bg-slate-600">
        <div className="rounded bg-slate-100 p-5 xl:w-[30%] overflow-auto">
          <h1 className="text-center text-3xl font-semibold">Register</h1>
          <form onSubmit={formik.handleSubmit} className="gap-10">
            {RegisterDetails.map((e, i) => (
              <div key={i} className="m-5">
                <label
                  className="text-slate text-md font-medium"
                  htmlFor={e.id}
                >
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
            <div className="text-center">
              <button
                className="bg-slate-600 rounded text-slate-100 p-2 w-[80px]"
                type="submit"
              >
                {loader ? (
                  <CircularProgress size={"1rem"} color="inherit" />
                ) : (
                  "Register"
                )}
              </button>
            </div>
            <div className="m-5">
              <Link href="/login">
                <p className="text-slate text-sm cursor-pointer">
                  Already Have Account? Login Here
                </p>
              </Link>
            </div>
            {error && (
              <div className="m-5">
                <p className="text-red-700 text-md font-semibold mt-1">
                  {error}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterData;
