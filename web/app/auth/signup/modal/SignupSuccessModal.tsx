'use client'

// next
import Link from "next/link"
// style
import './signupSuccessModal.scss'
import Modal from "@/app/components/elements/modal/Modal"

const SignupSuccessModal = ({isOpen, setIsOpen }:{isOpen:boolean , setIsOpen:() => void }) => {
  return (
  <>
    <Modal
    isOpen={isOpen}
    handleClose={setIsOpen}
    >
    <div className='SignupSuccessModal'>
        <p>登録しました</p>
        <Link href='/'>
        <button className="bactToLoginBtn">
          ログイン画面へ
        </button>
        </Link>
    </div>
    </Modal>
  </>
  )
}

export default SignupSuccessModal