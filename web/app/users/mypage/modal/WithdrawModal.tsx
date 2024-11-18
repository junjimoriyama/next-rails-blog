'use client'

// next
import { useRouter } from 'next/navigation'
// components
import Modal from '@/app/components/elements/modal/Modal'
// function
import { getCookie } from '@/app/components/functions/getCookies'
// style
import './withdrawModal.scss'

const WithdrawModal = () => {

  const router = useRouter()
  const token = getCookie('token')

  const handleWithdraw = async() => {
    console.log('退会する')

    const res = await fetch('http://localhost:3000/api/v1/users/me', {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      credentials: "include",
    })
    if(res.ok) {
      router.push('/auth/deleteUser')
    }
  }

  return (
    <Modal>
      <p
      className='confirmedWithdraw'
      >本当に退会しますか？
      </p>
      <button 
        className="execWithdrawBtn"
        onClick={handleWithdraw}
        >退会する
      </button>
    </Modal>
  )
}

export default WithdrawModal