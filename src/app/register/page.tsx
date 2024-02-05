import RegisterData from '@/components/register/RegisterData'
import React from 'react'

export async function registerData(values:any) {
  const response = await fetch("api/registerApi", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  return response
}

const RegisterPage = () => {
  return (
    <div>
      <RegisterData/>
    </div>
  )
}

export default RegisterPage