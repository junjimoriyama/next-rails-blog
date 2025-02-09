"use client";

// next
import Link from "next/link";
// react
import { toast, ToastContainer } from "react-toastify";
// components
import { loginUser } from "./actionLogin";
// style
import "react-toastify/dist/ReactToastify.css";
import "./login.scss";

import React, {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";
import { useRouter } from "next/navigation";

const login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // server actionの結果を受け取り処理を分岐
    const result = await loginUser(new FormData(e.currentTarget));

    if (result.success) {
      router.push("/posts");
    } else {
      toast.error("ログインに失敗しました。再度お試しください。", {
        position: "top-center",
        autoClose: 5000,
      });
      // メールとパスワード空にする
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="login">
      <h1 className="login_title">SIMPLE SNS</h1>
      <h2 className="login_sub_title">ログイン</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">
          メールアドレス
          <input
            className="email"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </label>
        <label htmlFor="password">
          パスワード
          <input
            className="password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </label>
        <Link href={"/auth/forgotPassword"}>
          <div className="moveToForgotPassword">パスワードお忘れの方</div>
        </Link>
        <button className="loginBtn" type="submit">
          ログイン
        </button>
      </form>

      <div className="promptSignup">
        <h3>登録まだの方はこちら</h3>
        <Link href={"/auth/signup"}>
          <button className="signupBtn">登録</button>
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default login;
