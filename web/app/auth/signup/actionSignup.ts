'use server'

import { redirect } from "next/navigation"; 

export const signupUser = async (formData: FormData) => {
  const username = formData.get('username')
  const email = formData.get('email')
  const password = formData.get('password')
  const passwordConf = formData.get('passwordConf')
  
  if(username && email && password && passwordConf) {
    const res = await fetch('http://api:3000/api/v1/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          username: username,
          email: email,
          password: password,
          password_confirmation: passwordConf
        }
      })
    })
    if(res.ok) {
      return {success: true}
    } else {
      return {success: false}
    }
  } else {
    return {success: false}
  }
}
// 'use server'

// import { redirect } from "next/navigation"; 

// export const signupUser = async (formData: FormData) => {
//   const username = formData.get('username')
//   const email = formData.get('email')
//   const password = formData.get('password')
//   const passwordConf = formData.get('passwordConf')
  
//   if(username && email && password && passwordConf) {
//     const res = await fetch('http://api:3000/api/v1/users', {
//       method: 'POST',
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         user: {
//           username: username,
//           email: email,
//           password: password,
//           password_confirmation: passwordConf
//         }
//       })
//     })
//     if(res.ok) {
//       redirect('/auth/login')
//     } else {
//       const errorData = await res.json();
//       throw new Error('登録に失敗しました: ' + JSON.stringify(errorData));
//     }
//   } else {

//   }
// }