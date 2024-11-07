import Link from "next/link";
import React from "react";
import './successResetPassword.scss'

const successResetPassword = () => {
  return (
    <div className="successResetPassword">
      <p>パスワードリセットしました。</p>
      <p>新しいパスワードでログインしてください。</p>
      <Link href="/auth/login">
        <button className="backToTop">ログインページに戻る</button>
      </Link>
    </div>
  );
};

export default successResetPassword