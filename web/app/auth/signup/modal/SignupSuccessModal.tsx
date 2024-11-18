"use client";

// next
import Link from "next/link";
// style
import "./signupSuccessModal.scss";
// import Modal from "@/app/components/elements/modal/Modal"
import { useRouter } from "next/navigation";
import { ModalContext } from "@/app/components/functions/ModalContext";
import { useContext, useEffect } from "react";
import Modal from "@/app/components/elements/modal/Modal";

const SignupSuccessModal = () => {
  const router = useRouter();

  const { setIsModalOpen, showCloseButton, setShowCloseButton } =
    useContext(ModalContext);

  useEffect(() => {
    setShowCloseButton(false);
  }, []);

  const handleBackToLogin = () => {
    setIsModalOpen(false);
    router.push("/");
  };

  return (
    <>
      <Modal>
        <div className="SignupSuccessModal">
          <div className="successModalText">
            <p>登録できました。</p>
            <p>ログインしてください。</p>
          </div>
          <Link href="/">
            <button className="bactToLoginBtn" onClick={handleBackToLogin}>
              ログイン画面へ
            </button>
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default SignupSuccessModal;
