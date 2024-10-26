"use client";

import { useRouter } from "next/navigation";

import "./logoutButton.scss";

import React from 'react'

const LogoutButton = () => {
  const router = useRouter();
  const handleClickLogoutButton = () => {
    // クッキーを削除
    document.cookie = 'token=; max-age=0; path=/';

    router.push("/auth/login");
  }
  return (
    <div 
    className="LogoutButton"
    onClick={handleClickLogoutButton}
    >
      Logout
    </div>
  )
}

export default LogoutButton