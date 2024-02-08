"use client";

import { UserDetails, userValidateSchema } from "@/utilities/utilities";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddUserData = () => {
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const routing = useRouter();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    address: "",
    city: "",
    role: "User",
  };

  const formik = useFormik<any>({
    initialValues: initialValues,
    validationSchema: userValidateSchema,
    onSubmit: async (values) => {
      setLoader(true);
      console.log(values, "hkhgcf");
      try {
        const response = await fetch("../api/userRegisterApi", {
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
          routing.push("/dashboard/userdata");
          setLoader(false);
        } else {
          setLoader(false);
          setError("User Registration Failed");
        }
      } catch (error: any) {
        console.log(values, "iuhgjhb");
        setLoader(false);
        console.log("Error During Registration:", error);
      }
    },
  });
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-[100vh] col-span-6 p-5 sm:p-0">
        <div className="rounded-md bg-slate-400 p-5 xl:w-[30%] overflow-auto">
          <h1 className="text-center text-3xl font-semibold">User Register</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {UserDetails.map((e, i) => (
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
                      className="sm:w-[250px] xl:w-[100%] p-[8px] rounded-md"
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
            </div>

            <div className="flex justify-center">
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

export default AddUserData;

// <div className="flex flex-col items-center justify-center h-[100vh] bg-slate-600 col-span-6">
//         <div className="rounded bg-slate-100 p-5 xl:w-[30%] overflow-auto">
//           <h1 className="text-center text-3xl font-semibold">User Register</h1>
//           <form onSubmit={formik.handleSubmit} className="gap-10">
//             {[0, 1, 2, 3].map((rowIndex) => (
//               <div key={rowIndex} className="flex space-x-4">
//                 {UserDetails.slice(rowIndex * 2, rowIndex * 2 + 2).map(
//                   (e, i) => (
//                     <div key={i} className="w-1/2">
//                       <label
//                         className="text-slate text-md font-medium"
//                         htmlFor={e.id}
//                       >
//                         {e.text}
//                       </label>
//                       <div className="mt-2">
//                         <input
//                           type={e.type}
//                           id={e.id}
//                           className="w-full p-[8px]"
//                           placeholder={`Enter the ${e.text}`}
//                           value={formik.values[e.id]}
//                           onChange={formik.handleChange}
//                         />
//                       </div>
//                       {formik.touched[e.id] && formik.errors[e.id] ? (
//                         <p className="text-red-700 text-md font-semibold mt-1">
//                           {formik.errors[e.id]}
//                         </p>
//                       ) : null}
//                     </div>
//                   )
//                 )}
//               </div>
//             ))}
//             <div className="text-center">
//               <button
//                 className="bg-slate-600 rounded text-slate-100 p-2 w-[80px]"
//                 type="submit"
//               >
//                 {loader ? (
//                   <CircularProgress size={"1rem"} color="inherit" />
//                 ) : (
//                   "Register"
//                 )}
//               </button>
//             </div>
//             {error && (
//               <div className="m-5">
//                 <p className="text-red-700 text-md font-semibold mt-1">
//                   {error}
//                 </p>
//               </div>
//             )}
//           </form>
//         </div>
//       </div>
