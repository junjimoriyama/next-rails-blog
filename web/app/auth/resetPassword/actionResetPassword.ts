"use server";

import { redirect } from "next/navigation";

export const sendPassword = async (formData: FormData) => {
  const password = formData.get("password");
  const token = formData.get("token");

  const res = await fetch(`http://api:3000/api/v1/password_resets/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        password: password,
        token: token,
    }),
  });
  
    if(res.ok) {
      redirect('/auth/successResetPassword')
    }
    if (!res.ok) {
      
    }
};