"use client";
// next
import { signupUser } from "./actionSignup";
// react
import { ModalContext } from "@/app/components/functions/ModalContext";
import { toast, ToastContainer } from "react-toastify";
// components
import SignupSuccessModal from "./modal/SignupSuccessModal";
// style
import "react-toastify/dist/ReactToastify.css";
import "./signup.scss";

import React, { ChangeEvent, useState, FormEvent, useContext } from "react";

const signup = () => {

  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ passwordConf, setPasswordConf  ] = useState('')
  const { isModalOpen, setIsModalOpen} = useContext(ModalContext)

  const onSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    

    if(!username || !email || !password || !passwordConf) {
      toast.error('全てのフォームに入力してください。', {
        position: 'top-center',
        autoClose: 5000,
      })
      return
    }

    const showToast = (errorMessage:string) => {
      toast.error(errorMessage, {
        position: 'top-center',
        autoClose: 5000,
      })
    }

    // if(!username.match(/^[\w\x01-\x7E]+$/)) {
    //   showToast('名前を正しく入力してください。')
    //   return
    if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
      showToast('メールアドレスを正しく入力してください。')
      return
    } else if (!password.match(/^[a-zA-Z\d]{6,}$/)) {
      showToast('パスワードを正しく入力してください。')
      return
    }


    // formデータ全体取得
    const formData = new FormData(e.currentTarget);
    // 結果を返す
    const result =  await signupUser(formData)
    // 成功したら
    if(result.success) {
      setIsModalOpen(true)
    } 
  }
  
  return (
    <div className="signup">
      <h1>サインアップ</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">
          ニックネーム
          <input 
          className="username" 
          type="text" 
          id="username" 
          name="username"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          />
        </label>
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
          パスワード (6桁の半角英数)
        <input
        className="password" 
        type="password" 
        id="password" 
        name="password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        </label>
        <label htmlFor="passwordConf">
          パスワード確認
          <input 
          className="passwordConf" 
          type="password" 
          id="passwordConf" 
          name="passwordConf"
          value={passwordConf}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswordConf(e.target.value)}
          />
        </label>

        <button className="signUpBtn" type='submit'>登録</button>
        <SignupSuccessModal />
      </form>
      <ToastContainer />
    </div>
  );
};

export default signup;
// "use client";

// import { signupUser } from "./actionSignup";
// import "./signup.scss";

// import React, { ChangeEvent, useState } from "react";

// const login = () => {

//   const [ username, setUsername ] = useState('')
//   const [ email, setEmail ] = useState('')
//   const [ password, setPassword ] = useState('')
//   const [ passwordConf, setPasswordConf  ] = useState('')
  
//   return (
//     <div className="login">
//       <h1>サインアップ</h1>
//       <form action={signupUser}>
//         <label htmlFor="username">
//           ニックネーム
//           <input 
//           className="username" 
//           type="text" 
//           id="username" 
//           name="username"
//           value={username}
//           onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
//           />
//         </label>
//         <label htmlFor="email">
//           メールアドレス
//           <input 
//           className="email" 
//           type="email" 
//           id="email" 
//           name="email"
//           value={email}
//           onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
//           />
//         </label>
//         <label htmlFor="password">
//           パスワード
//         <input
//         className="password" 
//         type="password" 
//         id="password" 
//         name="password"
//         value={password}
//         onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
//         />
//         </label>
//         <label htmlFor="passwordConf">
//           パスワード確認
//           <input 
//           className="passwordConf" 
//           type="password" 
//           id="passwordConf" 
//           name="passwordConf"
//           value={passwordConf}
//           // autoComplete="new-password"
//           onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswordConf(e.target.value)}
//           />
//         </label>

//         <button className="signUpBtn" type='submit'>送信</button>
//       </form>
//     </div>
//   );
// };

// export default login;

// eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0fQ.GadllP8_z-guZs_oxuo6H6QjT6xd2_yueHGeJSGGCzQ