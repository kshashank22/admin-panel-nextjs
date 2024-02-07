"use client";

import { ResetDetails, forgotValidateSchema } from "@/utilities/utilities";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import React, { useState } from "react";
import { forgotData } from "@/app/forgotPassword/page";

const ForgotPasswordData = () => {
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const initialValues = {
    email: "",
    password:"",
    confirmpassword:""
  };

  const formik = useFormik<any>({
    initialValues: initialValues,
    validationSchema: forgotValidateSchema,
    onSubmit: async (values: any) => {
      setError("");
      setLoader(true);
      try {
        const response = await forgotData(values);
        const res = await response.json();
        if (response.ok) {
          toast("Reset Successfully", {
            position: "top-right",
            autoClose: 5000,
          });
          formik.resetForm();
          window.location.href = "/";
          setLoader(false);
        } else {
          setLoader(false);
          setError(res.errors);
        }
      } catch (error: any) {
        setLoader(false);
        console.log("Error During Reset Password:", error);
      }
    },
  });
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-slate-600">
      <ToastContainer />
      <div className="rounded bg-slate-100 p-5 xl:w-[30%]">
        <h1 className="text-center text-3xl font-semibold">Forgot Password</h1>
        <form onSubmit={formik.handleSubmit} className="gap-10">
        {ResetDetails.map((e, i) => (
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
          <div className="text-center">
            <button
              className="bg-slate-600 rounded text-slate-100 p-2 w-[80px]"
              type="submit"
            >
              {loader ? (
                <CircularProgress size={"1rem"} color="inherit" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
          <div className="m-5">
            <Link href={"/"}>
              <p className="text-slate text-sm cursor-pointer">
                Back to Login? Click Here
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

export default ForgotPasswordData;
