'use client'

// next
import Link from "next/link"
// style
import "./deleteUser.scss"

const deleteUser = () => {

  return (
    <div className="deleteUser">
      <p>退会しました。</p>
      <p>今までご利用ありがとうございました。</p>
      <Link href='/'>
      <button 
      className="goToLoginBtn"
      >
        このページから離れる
      </button>
      </Link>
    </div>
  )
}

export default deleteUser