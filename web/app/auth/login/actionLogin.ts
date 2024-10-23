'use server'

import { redirect } from "next/navigation"; 

export const loginUser = async (formData: FormData) => {
  const email = formData.get('email')
  const password = formData.get('password')

  const res = await fetch('http://api:3000/api/v1/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user: {
        email: email,
        password: password,
      }
    })
  })
  if(res.ok) {
    const data = await res.json()
    const token = data.token
    console.log(token)

    redirect('/')
  } else {
    const errorData = await res.json()
    throw new Error('ログインできません', errorData)
  }
}