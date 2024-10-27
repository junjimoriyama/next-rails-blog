'use client'

import React, { useState } from 'react'
import { sendEmail } from './actionForgotPassword';
import './forgotPassword.scss'

const forgotPassword = () => {
  const [ email, setEmail  ] = useState('')

  return (
    <div className="forgotPassword">
      <h1>パスワードお忘れの方</h1>
      <form action={sendEmail}>
        <label htmlFor="email">
          メールアドレス
          <input 
          className="email" 
          type="email" 
          id="email" 
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          // onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
        </label>

        <button className="forgotPasswordBtn" type='submit'>送信</button>
      </form>
    </div>
  );
}

export default forgotPassword