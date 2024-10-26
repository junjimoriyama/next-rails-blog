"use client";

import Link from "next/link";
import { loginUser } from "./actionLogin";
import "./login.scss";

import React, { ChangeEvent, useState } from "react";

const login = () => {

  const [ email, setEmail  ] = useState('')
  const [ password, setPassword ] = useState('')

  return (
    <div className="login">
      <h1>ログイン</h1>
      <form action={loginUser}>
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
        </label>
        <label htmlFor="password">
          パスワード
        <input
        className="password"
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        </label>
        <button className="loginBtn" type='submit'>送信</button>
      </form>

      <div className="promptSignup">
      <h3>登録まだの方はこちら</h3>
      <Link href={"/auth/signup"}>
        <button className="signupBtn">登録</button>
      </Link>
      </div>
    </div>
  );
};

export default login;

// "use client";

// import { useRouter } from "next/navigation";
// import React, { ChangeEvent, useState } from "react";

// import "./login.scss";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const router = useRouter();

//   // ログイン関数
//   const handleLoginUser = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/api/v1/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           user: {
//             email: email,
//             password: password,
//           },
//         }),
//       });
      
//       if (res.ok) {
//         const data = await res.json();
//         console.log("dataは-----", data);
//         const token = data.user.token;
//         document.cookie = `token=${token}`;
//         // localStorage.setItem("token", token);
//         // ローカルストレージなどにトークンを保存する処理
//         router.push("/posts");
//       } else {
//         const errorData = await res.json();
//         console.error("ログイン失敗: ", errorData);
//         throw new Error("ログインできません");
//       }
//     } catch (error) {
//       console.error("エラー発生: ", error);
//     }
//   };

//   // フォーム送信時のハンドラ
//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault(); // ページリロードを防ぐ
//     handleLoginUser(); // ログイン関数を呼び出す
//   };

//   return (
//     <div className="login">
//       <h1>ログイン</h1>
//       <form onSubmit={onSubmit}>
//         <label htmlFor="email">
//           メールアドレス
//           <input
//             className="email"
//             type="email"
//             id="email"
//             name="email"
//             value={email}
//             onChange={(e: ChangeEvent<HTMLInputElement>) =>
//               setEmail(e.target.value)
//             }
//           />
//         </label>
//         <label htmlFor="password">
//           パスワード
//           <input
//             className="password"
//             type="password"
//             id="password"
//             name="password"
//             value={password}
//             onChange={(e: ChangeEvent<HTMLInputElement>) =>
//               setPassword(e.target.value)
//             }
//           />
//         </label>
//         <button className="signUpBtn" type="submit">
//           送信
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
