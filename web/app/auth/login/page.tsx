"use client";

import Link from "next/link";
import { loginUser } from "./actionLogin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.scss";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const login = () => {

  const router = useRouter()

  const [ email, setEmail  ] = useState('')
  const [ password, setPassword ] = useState('')

  const onSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // server actionの結果を受け取り処理を分岐
    const result = await loginUser(new FormData(e.currentTarget))
    
    if(result.success) {
      router.push('/posts')
    } else {
      toast.error('ログインに失敗しました。再度お試しください。', {
        position: 'top-center',
        autoClose: 5000,
      })
      // メールとパスワード空にする
      setEmail('')
      setPassword('')
    }
  }

  return (
    <div className="login">
      <h1>ログイン</h1>
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
        <Link href={"/auth/forgotPassword"}>
        <div className="forgotPassword">パスワードお忘れの方</div>
      </Link>
        <button className="loginBtn" type='submit'>送信</button>
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






// "use client";

// import { useRouter } from "next/navigation";
// import React, { ChangeEvent, useState } from "react";
// // react用通知
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import "./login.scss";
// import Link from "next/link";

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
//         const token = data.user.token;
//         console.log('ログインのtokenは', token)
//         document.cookie = `token=${token}`;
//         router.push("/posts");
//       } else {
//         console.log('toast')
//         toast.error("メールとパスワードが一致しませんでした。未登録の方は登録してください。", {
//           position: "top-center",
//           autoClose: 5000,
//         });
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
//       <Link href={"/auth/forgotPassword"}>
//         <div className="forgotPasswordLink">パスワードお忘れの方</div>
//       </Link>
//         <button className="loginBtn" type='submit'>送信</button>
//       </form>

//       <div className="promptSignup">
//       <h3>登録まだの方はこちら</h3>
//       <Link href={"/auth/signup"}>
//       <button className="signupBtn">登録</button>
//       </Link>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;
