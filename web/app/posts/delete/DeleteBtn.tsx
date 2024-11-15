"use client";

import { DeleteBtnProps } from "@/types";
import { useRouter } from "next/navigation";
import { getCookie } from "@/app/components/functions/getCookies";

import './deleteBtn.scss'

const DeleteBtn = ({id}: DeleteBtnProps) => {

  const router = useRouter()
  const handleDelete = async () => {
    const token = getCookie('token')
    const res = await fetch(`http://localhost:3000/api/v1/posts/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if(res.ok) {
      // 削除された後を反映
      router.refresh()
    }
  }

  return (
    <button className="deleteBtn" onClick={handleDelete}>
      削除
    </button>
  )
}

export default DeleteBtn;
