"use client";

// next
import Link from "next/link";
// react
import React, { ChangeEvent, useEffect, useState } from "react";
// component
import { getCookie } from "@/app/components/functions/getCookies";
// style
import "./mypage.scss";


const user = () => {
  // idを取得
  const token = getCookie("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  // 名前
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [followingsCount, setFollowingsCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);

  // テータ取得関数
  const fetchData = async (url: string, method: string) => {
    const res = await fetch(url, { method: method, headers, credentials: "include" });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("データ取得に失敗");
    }
  };

  useEffect(() => {
    // 全てのデータを取得
    const allFetchData = async () => {

      // ユーザーデータ取得
      const fetchUserDataRes = await fetchData(
        "http://localhost:3000/api/v1/users/me",
        "GET"
      );
      setUserId(fetchUserDataRes.id);
      setUsername(fetchUserDataRes.username);
      setEmail(fetchUserDataRes.email);
      setAvatarUrl(fetchUserDataRes.avatarUrl);

      // フォローしている人の取得
      const fetchFollowingsData = await fetchData(
        "http://localhost:3000/api/v1/users/followings",
        "GET"
      );
      setFollowingsCount(fetchFollowingsData.length);
      // フォロアーされている人の取得
      const fetchFollowersData = await fetchData(
        "http://localhost:3000/api/v1/users/followers",
        "GET"
      );
      setFollowersCount(fetchFollowersData.length); 
    };
    allFetchData();
  }, []);


  const avatarUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    // filesがnullか空かをチェック
    if (!files || files.length === 0) return;
    // ファイルを取得
    const file = files[0];
    // 一時URLの生成
    setAvatarUrl(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("avatar", file); // ここで直接fileをformDataに追加

    const res = await fetch(
      `http://localhost:3000/api/v1/users/${userId}
      `,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (res.ok) {
      const data = await res.json();
      setAvatarUrl(data.avatarUrl); // サーバーのURLを最終的に設定
    } 

    // 生成した一時URLを解放してメモリを確保
    URL.revokeObjectURL(avatarUrl);
  };

  return (
    <div className="user">
      <p>{username}</p>
      <p>{email}</p>
      <div className="followInfo">
        <Link href="/users/mypage/followings">
          <p className="followingsCount">フォロー数: {followingsCount}</p>
        </Link>
        <Link href="/users/mypage/followers">
          <p className="followerCount">フォロワー数: {followersCount}</p>
        </Link>
      </div>
      {avatarUrl && <img className="avatarImg" src={avatarUrl} alt="" />}

      <label className="fileBtn" htmlFor="avatarUpload">
        {avatarUrl ? "画像を変更" : "画像を追加"}
      </label>
      <input
        id="avatarUpload"
        type="file"
        onChange={(e) => {
          avatarUpload(e);
        }}
      />

      <Link href="/posts">
        <button className="fromPostToTopBtn">戻る</button>
      </Link>
    </div>
  );
};
export default user;
