"use client";

import { signupUser } from "./actionSignup";
import "./signup.scss";

import React, { ChangeEvent, useState } from "react";

const login = () => {

  const [ email, setEmail  ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ passwordConf, setPasswordConf  ] = useState('')

  return (
    <div className="login">
      <h1>サインイン</h1>
      <form action={signupUser}>
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
        <label htmlFor="passwordConf">
          パスワード確認
          <input 
          className="passwordConf" 
          type="password" 
          id="passwordConf" 
          name="passwordConf"
          value={passwordConf}
          // autoComplete="new-password"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswordConf(e.target.value)}
          />
        </label>

        <button className="signUpBtn" type='submit'>送信</button>
      </form>
    </div>
  );
};

export default login;

// eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0fQ.GadllP8_z-guZs_oxuo6H6QjT6xd2_yueHGeJSGGCzQ