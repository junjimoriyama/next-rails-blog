"use client";

import { getCookie } from "@/app/components/functions/getCookies";
import { useEffect, useState } from "react";

const Avatar = ({userId}: {userId: number}) => {
  const token = getCookie("token");


  const [avatarUrl, setAvatarUrl] = useState(null);
  const [posts, setPosts] = useState(null);
  // const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchAvatarData = async () => {
      const avatarRes = await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include"
      });
      if(avatarRes.ok) {
        const data = await avatarRes.json()
        setAvatarUrl(data.avatarUrl)
      }
    };
    fetchAvatarData()
  }, [])

  return <div>
  {avatarUrl &&
  <img 
  className="avatarImg"
  src={avatarUrl} alt="" />
  }
    </div>;
};

export default Avatar;
