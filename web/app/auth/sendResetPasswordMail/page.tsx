import Link from "next/link";
import React from "react";
import './sendResetPasswordMail.scss'

const sendResetPasswordMail = () => {
  return (
    <div className="sendResetPasswordMail">
      <p>パスワードリセット用のメールを送りました。</p>
      <p>ご確認ください。</p>
      <Link href="/auth/login">
        <button className="backToLogin">ログインページに戻る</button>
      </Link>
    </div>
  );
};

export default sendResetPasswordMail
