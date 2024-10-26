'use server'

import { redirect } from "next/navigation"; 

export const signupUser = async (formData: FormData) => {
  const email = formData.get('email')
  const password = formData.get('password')
  const passwordConf = formData.get('passwordConf')

  const res = await fetch('http://api:3000/api/v1/users', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user: {
        email: email,
        password: password,
        password_confirmation: passwordConf
      }
    })
  })
  if(res.ok) {
    redirect('/auth/login')
  } else {
    const errorData = await res.json()
    throw new Error('失敗しました', errorData)
  }
}