"use client";

// next
import { useRouter } from "next/navigation";
// react
import React, { useState, FormEvent, ChangeEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
// components
import { sendEmail } from "./actionForgotPassword";
// style
import "react-toastify/dist/ReactToastify.css";
import "./forgotPassword.scss";

const forgotPassword = () => {
  const router = useRouter()
  const [email, setEmail] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const showToast = (errorMessage: string) => {
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
      });
    };
    // 空文字チェック
    if (email === "") {
      return showToast("メールアドレスを入力してください");
    }
  
    // 非同期処理の結果
    const formData = new FormData(e.currentTarget)
    const result = await sendEmail(formData);
    if (result.success) {
      router.push('/auth/sendResetPasswordMail')

    } else {
      showToast("送信できませんでした");
    }
  };

  return (
    <div className="forgotPassword">
      <h1>パスワードお忘れの方</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">
          メールアドレス
          <input
            className="email"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <p className="forgotPasswordText">
            パスワードリセットのメール送ります。
          </p>
        </label>

        <button className="forgotPasswordBtn" type="submit">
          送信
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default forgotPassword;