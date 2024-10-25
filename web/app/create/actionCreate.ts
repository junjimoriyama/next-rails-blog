'use server'

import { redirect } from "next/navigation"; 
import { cookies } from 'next/headers';


export const createPost = async(formData: FormData) => {

   // クッキーからJWTトークンを取得
  //  const cookieStore = cookies();
  //  const token = cookieStore.get('token')?.value;
  //  console.log('cookieStore',cookieStore)

  const title = formData.get('title')
  const content = formData.get('content')
  const category = formData.get('category')
  
  // const res = await fetch("http://api:3000/api/v1/posts",{
  //   method: 'POST',
  //   headers: {
  //     "Authorization": `Bearer ${token}`,
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify({
  //     post: {
  //       title: title,
  //       content: content,
  //       category_id: category
  //     }
  //   })
  // })
  // if(res.ok) {
  //   redirect('/posts')
  // } else {
  //   const errorData = await res.json();
  //   console.error('APIエラー:', errorData);
  //   throw new Error('失敗しました')
  // }
}

