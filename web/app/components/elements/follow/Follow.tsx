'use client'

import { useParams } from 'next/navigation'
import './follow.scss'
import { getCookie } from '../../functions/getCookies'

const Follow = () => {

  const params = useParams()
  const token = getCookie("token");
  
  const handleFollow = async() => {
    const followRes = await fetch(`http://localhost:3000/api/v1/users/${params.id}/relationship`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ user_id: params.id })
    }) 
  }

  return (
    <button 
    className="followBtn"
    onClick={handleFollow}
    >
      フォローする
    </button>
  )
}

export default Follow