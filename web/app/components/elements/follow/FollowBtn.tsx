"use client";

// react
import { useEffect, useState } from "react";
// components
import { getCookie } from "../../functions/getCookies";
// style
import "./followBtn.scss";

const Follow = ({ userId }: { userId: Number }) => {
  const token = getCookie("token");

  const [isFollow, setIsFollow] = useState(true);

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  // テータ取得関数
  const fetchData = async (url: string, method: string) => {
    const res = await fetch(url, {
      method: method,
      headers,
      credentials: "include",
    });
    if (res.ok) {
      const textDate = await res.text();
      // データが空であることも想定
      return textDate ? JSON.parse(textDate) : null;
    } else {
      throw new Error("データ取得に失敗");
    }
  };

  useEffect(() => {
    const fetchGetFollow = async () => {
      const followData = await fetchData(
        `http://localhost:3000/api/v1/users/followings`,
        "GET"
      );
      setIsFollow(
        followData.find((data: { id: number }) => data.id === Number(userId))
      );
    };
    fetchGetFollow();
  }, []);

  // フォローしたら
  const handleFollow = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await fetchData(
      `http://localhost:3000/api/v1/users/${userId}/relationship`,
      "POST"
    );
    setIsFollow(true);
  };

  // フォロー外したら
  const handleUnFollow = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await fetchData(
      `http://localhost:3000/api/v1/users/${userId}/relationship`,
      "DELETE"
    );
    setIsFollow(false);
  };

  return (
    <div className="followBtns">
      {isFollow ? (
        <button className="unFollowBtn" onClick={handleUnFollow}>
          フォローを外す
        </button>
      ) : (
        <button className="followBtn" onClick={handleFollow}>
          フォローする
        </button>
      )}
    </div>
  );
};

export default Follow;

// 画面によってデフォルト値を変える。フォロアーはfalseを初期値にする。