'use server'

import { redirect } from "next/navigation"; 

export const createPost = async(formData: FormData) => {

  const title = formData.get('title')
  const content = formData.get('content')
  const category = formData.get('category')


  const res = await fetch("http://api:3000/api/v1/posts",{
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      post: {
        title: title,
        content: content,
        category_id: category
      }
    })
  })
  if(res.ok) {
    redirect('/')
  } else {
    throw new Error('失敗しました')
  }
}

