"use client";

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
        <button className="signUpBtn" type='submit'>送信</button>
      </form>
    </div>
  );
};

export default login;
