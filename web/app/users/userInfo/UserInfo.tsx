'use client'

import './userInfo.scss'
import Link from 'next/link'
import { getCookie } from '@/app/components/functions/getCookies'
import { useEffect, useState } from 'react'

const UserInfo = () => {

  const token = getCookie('token')

  const [id, setId] = useState(null);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const fetchUserInfo = async() => {
      const res = await fetch(`http://localhost:3000/api/v1/users/me`, {

        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
          // "Authorization": `Bearer ${token?.value}`,
          "Content-Type": "application/json",
        },
        credentials: 'include'
      })
      const data = await res.json()
      setUsername(data.user.username);
      setId(data.user.id);
      setAvatarUrl(data.user.avatarUrl);

    }
    fetchUserInfo()
  }, [])

  return (
      <Link href={`/users/${id}`}>
    <div className='userInfo'>
      {
        avatarUrl &&
      <img 
      className="avatarImg"
      alt=""
      src={avatarUrl}
      />
      }
      <div className="userImage">{`${username}`}</div>
    </div>
      </Link>
  )
}

export default UserInfo




// import { cookies } from "next/headers";
// import "./userInfo.scss";
// import Link from "next/link";

// const UserInfo = async () => {
//   const cookieStore = cookies();
//   const token = cookieStore.get("token");

//   const res = await fetch(`http://api:3000/api/v1/users/me`, {
//     method: "GET",
//     headers: {
//       'Authorization': `Bearer ${token?.value}`,
//       // "Authorization": `Bearer ${token?.value}`,
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//   });
//   const data = await res.json();
//   console.log("meのdataは", data);

//   return (
//     <Link href={`/users/${data.user.id}`}>
//       <div className="userInfo">
//       <img 
//       className="avatarImg"
//       alt=""
//       src={data.user.avatarUrl}
//       />
//         <div className="userName">{`${data.user.username}`}</div>
//       </div>
//     </Link>
//   );
// };

// export default UserInfo;
