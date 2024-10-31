import { Cookie } from './../../../../node_modules/undici-types/cookies.d';
'use server'

import { redirect } from "next/navigation";
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
    redirect('/posts');
  } else {
    redirect('/auth/signup');
  }
}



    // const postRes = await fetch('http://api:3000/api/v1/posts',{
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${token}`
    //   },
    //   credentials: 'include'
    // })

    // if(postRes.ok) {
    //   const posts = await postRes.json()
    //   console.log("投稿データ:", posts);
    //   redirect('/posts');  // 投稿ページにリダイレクト
    // } else {
    //   console.error("投稿データの取得に失敗しました");
    // }
