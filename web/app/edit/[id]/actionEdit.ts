'use server'

import { error } from "console";
import { redirect } from "next/navigation"; 

export const editPost = async(formData: FormData) => {
  console.log([...formData.entries()]); 

  const id = formData.get('id')
  const title = formData.get('title')
  const content = formData.get('content')
  const category = formData.get('categoryData')

  const res = await fetch(`http://api:3000/api/v1/posts/${id}`,{
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title,
      content: content,
      category_id: Number(category), 
    })
  })

  if(res.ok) {
    redirect('/')
  } else {
    const errorMsg = await res.text()
    throw new Error(`失敗しました: ${res.status} ${res.statusText} - ${errorMsg}`)
  }
}

