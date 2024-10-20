'use server'

import { redirect } from "next/navigation"; 

export const editPost = async(formData: FormData) => {

  const title = formData.get('title')
  const content = formData.get('content')
  const category = formData.get('category')

 
  // if(res.ok) {
  //   redirect('/')
  // } else {
  //   throw new Error('失敗しました')
  // }
}

