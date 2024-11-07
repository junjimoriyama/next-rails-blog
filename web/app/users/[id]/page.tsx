"use client";

import { getCookie } from "@/app/components/functions/getCookies";
import { useParams } from "next/navigation";
import React, { ChangeEvent, use, useEffect, useState } from "react";

import "./user.scss";
import Link from "next/link";

const user = () => {
  // idを取得
  const params = useParams();

  // 名前
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  // const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = getCookie("token");
      const res = await fetch(
        `http://localhost:3000/api/v1/users/me`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setUsername(data.user.username);
        setEmail(data.user.email);
        setAvatarUrl(data.user.avatarUrl);
      }
    };
    fetchUserData();
  }, []);

  const avatarUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if(!files || files.length === 0) return
    // filesがnullか空かをチェック

    // ファイルを取得
    const file = files[0]

    // 一時URLの生成
    setAvatarUrl(URL.createObjectURL(file));

    const token = getCookie("token");

    const formData = new FormData();
    formData.append("avatar", file); // ここで直接fileをformDataに追加

    const res = await fetch(`http://localhost:3000/api/v1/users/${params.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      console.log("アップロード後のデータ:", data);
      setAvatarUrl(data.avatarUrl); // サーバーのURLを最終的に設定
    }

    // 生成した一時URLを解放してメモリを確保
    URL.revokeObjectURL(avatarUrl);
  };

  return (
    <div className="user">
      <p>{username}</p>
      <p>{email}</p>
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
      <Link href='/posts'>
      <button className="fromPostToTopBtn">
        戻る
      </button>
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

// const user = () => {
//   // idを取得
//   const params = useParams();

//   // 名前
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [avatar, setAvatar] = useState<File | null>(null);
//   const [avatarUrl, setAvatarUrl] = useState<string>("");

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = getCookie("token");
//       const res = await fetch(
//         `http://localhost:3000/api/v1/users/${params.id}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const data = await res.json();
//       console.log("userのデータは", data);
//       setUsername(data.user.username);
//       setEmail(data.user.email);
//       setAvatar(data.user.avatar);
//       setAvatarUrl(data.user.avatarUrl);
//     };
//     fetchUserData();
//   }, []);

//   const handleSubmit = async () => {
//     const token = getCookie("token");

//     const formData = new FormData();
//     if (avatar) {
//       // アバターのデータ
//       formData.append("avatar", avatar);
//     }

//     const res = await fetch(`http://localhost:3000/api/v1/users/${params.id}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: formData,
//     });

//     console.log("profileのformData", formData);

//     if (res.ok) {
//       const data = await res.json();
//       setAvatarUrl(data.avatarUrl);
//     }
//   };

//   return (
//     <div className="user">
//       <p>{username}</p>
//       <p>{email}</p>
//       <input
//         type="file"
//         onChange={(e) => {
//           if (e.target.files) {
//             setAvatar(e.target.files[0]);
//           }
//         }}
//       />
//       <button onClick={handleSubmit}>更新</button>
//       <img className="avatar" src={avatarUrl} alt="" />
//     </div>
//   );
// };

// export default user;
