"use client";

import { getCookie } from "@/app/components/functions/getCookies";
import { useParams } from "next/navigation";
import React, { ChangeEvent, use, useEffect, useState } from "react";

import "./user.scss";
import Link from "next/link";
import Follow from "@/app/components/elements/follow/Follow";

const user = () => {
  // idを取得
  const params = useParams();

  // 名前
  // 表示しているユーザー
  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [following, setFollowing] = useState("");
  const [follower, setFollower] = useState("");
  // ログイン中のユーザー
  const [currentUserId, setCurrentUserId] = useState(0);
  const token = getCookie("token");
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // ユーザー情報取得
        const resUser = await fetch(`http://localhost:3000/api/v1/users/${params.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (resUser.ok) {
          const dataUser = await resUser.json();
          setUserId(dataUser.user.id)
          setUsername(dataUser.user.username);
          setAvatarUrl(dataUser.user.avatarUrl);
        }
  
        // ログイン中のユーザー情報取得
        const resCurrentUser = await fetch(`http://localhost:3000/api/v1/users/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (resCurrentUser.ok) {
          const dataCurrentUser = await resCurrentUser.json();
          setCurrentUserId(dataCurrentUser.user.id);
        }
      } catch (error) {
        console.error("データの取得中にエラーが発生しました:", error);
      }
    };
  
    fetchUserData();
  }, []);
  

  const fetchFollowData = async() => {
    const followRes = await fetch( `http://localhost:3000/api/v1/users/followings/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    if (followRes.ok) {
      const data = await followRes.json();
      setUsername(data.user.username);
      setAvatarUrl(data.user.avatarUrl);
    }
    fetchFollowData()
  }

  return (
    <div className="user">
      {avatarUrl && <img className="avatarImg" src={avatarUrl} alt="" />}
      <p>{username}</p>
      <Link href='/posts'>
      {userId !== currentUserId &&
      <Follow/>
      }
      <button className="fromPostToTopBtn">
        戻る
      </button>
      </Link>
    </div>
  );
};

export default user;
