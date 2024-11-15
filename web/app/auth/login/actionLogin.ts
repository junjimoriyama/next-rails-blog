'use server'

// cookies
import { cookies } from 'next/headers'

export const loginUser = async (formData: FormData) => {
  const email = formData.get('email')
  const password = formData.get('password')
  

  const res = await fetch('http://api:3000/api/v1/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include', 
    body: JSON.stringify({
      user: {
        email: email,
        password: password,
      }
    })
  })
  if(res.ok) {
    const data = await res.json()
    const token = data.user.token
    // クッキーのセット
    const cookieStore = cookies()
    cookieStore.set('token', token, {
      maxAge: 60 * 60 * 24  // 1日間有効
    })
    return {success: true}
  } else {
    return {success: false}
  }
}