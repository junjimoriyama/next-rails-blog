"use client";

// next
import Link from "next/link";
// react
import { useEffect, useState } from "react";
// component
import FollowBtn from "@/app/components/elements/follow/FollowBtn";
// cookies
import { getCookie } from "@/app/components/functions/getCookies";
// style
import "./followers.scss";

const FollowersPage = () => {
  const token = getCookie("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const [userId, setUserId] = useState("");
  const [followerUsers, setFollowerUsers] = useState<
    { id: number, username: string, avatarUrl:string }[]
  >([]);

  const fetchData = async (url: string) => {
    const res = await fetch(url, { headers });
    if (res.ok) {
      return res.json();
    }
    throw new Error("データ取得に失敗");
  };

  useEffect(() => {
    const fetchAllData = async () => {

        // 自分のユーザーデータ
        const userData = await fetchData(
          `http://localhost:3000/api/v1/users/me`
        );
        setUserId(userData.id);

        // フォロー中のユーザーデータ
        const followersData = await fetchData(
          `http://localhost:3000/api/v1/users/followers`
        );
        setFollowerUsers(followersData)
    };
    fetchAllData();
  }, []);

  return (
    <div className="mypage_followers">
      <div className="followersList">
        {followerUsers.map((user) => (
          <ul key={user.id} className="followersItems">
            {user.avatarUrl && <img className="avatarImg" src={user.avatarUrl} alt="" />}
            <li>{user.username}</li>
            {/* <FollowBtn userId={user.id} /> */}
          </ul>
        ))}
      </div>
      <Link href="/users/mypage">
        <div className="BackToMypage">マイページに戻る</div>
      </Link>
    </div>
  );
};
export default FollowersPage;
