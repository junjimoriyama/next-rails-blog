"use client";

// next
import Link from "next/link";
import { useParams } from "next/navigation";
// react
import React, { useEffect, useState } from "react";
// cookies
import { getCookie } from "@/app/components/functions/getCookies";
// components
import FollowBtn from "@/app/components/elements/follow/FollowBtn";
// style
import "./user.scss";

const user = () => {
  // idを取得
  const params = useParams();

  // 名前
  // 表示しているユーザー
  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  // ログイン中のユーザー
  const [currentUserId, setCurrentUserId] = useState(0);
  // トークン
  const token = getCookie("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const fetchData = async (url: string) => {
    const res = await fetch(url, { headers });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("データ取得に失敗");
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      const userRes = await fetchData(
        `http://localhost:3000/api/v1/users/${params.id}`
      );
      setUserId(userRes.id);
      setUsername(userRes.username);
      setAvatarUrl(userRes.avatarUrl);
      // const followRes = await fetchData(
      //   `http://localhost:3000/api/v1/users/followings/`
      // );
      // // console.log(followRes)
      // const currentUser = followRes.find((user: {id: number}) => user.id === Number(params.id))
      // setUsername(currentUser.username);
      // console.log(currentUser.avatarUrl)
      // // setAvatarUrl(currentUser.avatarUrl);
    };


    fetchAllData();
  }, []);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       // ユーザー情報取得
  //       const resUser = await fetch(
  //         `http://localhost:3000/api/v1/users/${params.id}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       if (resUser.ok) {
  //         const dataUser = await resUser.json();
  //         setUserId(dataUser.id);
  //         setUsername(dataUser.username);
  //         setAvatarUrl(dataUser.avatarUrl);
  //       }

  //       // ログイン中のユーザー情報取得
  //       const resCurrentUser = await fetch(
  //         `http://localhost:3000/api/v1/users/me`,
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       if (resCurrentUser.ok) {
  //         const dataCurrentUser = await resCurrentUser.json();
  //         setCurrentUserId(dataCurrentUser.id);
  //       }
  //     } catch (error) {
  //       console.error("データの取得中にエラーが発生しました:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  // const fetchFollowData = async () => {
  //   const followRes = await fetch(
  //     `http://localhost:3000/api/v1/users/followings/`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   if (followRes.ok) {
  //     const data = await followRes.json();
  //     console.log(data)
  //     setUsername(data.user.username);
  //     setAvatarUrl(data.user.avatarUrl);
  //   }
  //   fetchFollowData();
  // };

  return (
    <div className="user">
      {avatarUrl && <img className="avatarImg" src={avatarUrl} alt="" />}
      <p>{username}</p>
      <Link href="/posts">
        {userId !== currentUserId && <FollowBtn userId={Number(params.id)} />}
        <button className="fromPostToTopBtn">戻る</button>
      </Link>
    </div>
  );
};

export default user;

// "use client";

// import { getCookie } from "@/app/components/functions/getCookies";
// import { useParams } from "next/navigation";
// import React, { ChangeEvent, use, useEffect, useState } from "react";

// import "./user.scss";
// import Link from "next/link";
// import FollowBtn from "@/app/components/elements/follow/FollowBtn";

// const user = () => {
//   // idを取得
//   const params = useParams();

//   // 名前
//   // 表示しているユーザー
//   const [userId, setUserId] = useState(0);
//   const [username, setUsername] = useState("");
//   const [avatarUrl, setAvatarUrl] = useState("");
//   // ログイン中のユーザー
//   const [currentUserId, setCurrentUserId] = useState(0);
//   const token = getCookie("token");

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // ユーザー情報取得
//         const resUser = await fetch(`http://localhost:3000/api/v1/users/${params.id}`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (resUser.ok) {
//           const dataUser = await resUser.json();
//           setUserId(dataUser.id)
//           setUsername(dataUser.username);
//           setAvatarUrl(dataUser.avatarUrl);
//         }

//         // ログイン中のユーザー情報取得
//         const resCurrentUser = await fetch(`http://localhost:3000/api/v1/users/me`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (resCurrentUser.ok) {
//           const dataCurrentUser = await resCurrentUser.json();
//           setCurrentUserId(dataCurrentUser.id);
//         }
//       } catch (error) {
//         console.error("データの取得中にエラーが発生しました:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const fetchFollowData = async() => {
//     const followRes = await fetch( `http://localhost:3000/api/v1/users/followings/`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     })
//     if (followRes.ok) {
//       const data = await followRes.json();
//       setUsername(data.user.username);
//       setAvatarUrl(data.user.avatarUrl);
//     }
//     fetchFollowData()
//   }

//   return (
//     <div className="user">
//       {avatarUrl && <img className="avatarImg" src={avatarUrl} alt="" />}
//       <p>{username}</p>
//       <Link href='/posts'>
//       {userId !== currentUserId &&
//       <FollowBtn
//       userId={Number(params.id)}
//       />
//       }
//       <button className="fromPostToTopBtn">
//         戻る
//       </button>
//       </Link>
//     </div>
//   );
// };

// export default user;
