'use client'

import React, { useState } from 'react'
import { sendPassword } from './actionResetPassword';
import './resetPassword.scss'

const resetPassword = () => {

  const [ password, setPassword ] = useState('')
  const [ passwordConf, setPasswordConf  ] = useState('')

  return (
    <div className="resetPassword">
      <h1>パスワードのリセット</h1>
      <form action={sendPassword}>
        <label htmlFor="password">
          パスワード
        <input
        className="password" 
        type="password" 
        id="password" 
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
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
          onChange={e => setPasswordConf(e.target.value)}
          />
        </label>

        <button className="resetPasswordBtn" type='submit'>送信</button>
      </form>
    </div>
  );
};
export default resetPassword