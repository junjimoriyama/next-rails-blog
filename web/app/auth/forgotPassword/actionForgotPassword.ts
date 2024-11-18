"use server";

export const sendEmail = async (formData: FormData) => {
  const email = formData.get("email");

  if (email) {
    const res = await fetch("http://api:3000/api/v1/password_resets", {
      // password_resets/createを呼び出す
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // メールの中身
      body: JSON.stringify({ email: email }),
    });

    if (res.ok) {
      return { success: true };
    } else {
      return { success: false };
    }
  } else {
    return { success: false };
  }
};

// 'use server'

// import { redirect } from "next/navigation";

// export const sendEmail = async(formData: FormData) => {

//   const email = formData.get('email');
//   // 空文字チェック
//   if( email !== '') {

//     return
//   }

//   if (!email.match("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")) {
//     return;
//   }

//   const res = await fetch('http://api:3000/api/v1/password_resets', {
//     // password_resets/createを呼び出す
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     // メールの中身
//     body: JSON.stringify({email: email})
//   })

//   if(res.ok) {
//     redirect('/auth/sendResetPasswordMail')
//   } else {
//     console.error('Error:', res.statusText)
//   }
// }
