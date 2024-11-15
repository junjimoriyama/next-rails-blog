'use client'

import { getCookie } from "@/app/components/functions/getCookies";
import { ChangeEvent, useEffect, useState } from "react"

const SortBtn = () => {
  const token = getCookie('token');
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const [postsData, setPostsData] = useState([]);


  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('http://localhost:3000/api/v1/posts', {
        headers,
      });
      if (res.ok) {
        const posts = await res.json();
        setPostsData(posts);
      }
    };
    fetchPosts();
  }, []);

  const handleToggleOrderPosts = (e: ChangeEvent<HTMLSelectElement>) => {

    const sortPosts = postsData.sort((a: any, b: any) => {
      const dataA = new Date(a.created_at).getTime()
      const dataB = new Date(b.created_at).getTime()
      if (e.target.value === "Ascending") {
        return dataB - dataA;
      } else {
        return dataA - dataB
      }
    });
  };

  return (
    <div className="sortBtn">
      <select onChange={(e) => handleToggleOrderPosts(e)}>
        <option value="ascending">新しい順</option>
        <option value="descending">古い順</option>
      </select>
    </div>
  );
};

export default SortBtn;


// postはuserDataにある


// interface userDataProp {
//   avatarUrl: string,
//   email: string,
//   id: number,
//   username: string
// }

//   const postsCreateAtData = postData.map((data: any) => new Date(data.created_at))
//   postsCreateAtData.sort((a:Date, b:Date) => {
//     return b.getTime() - a.getTime(); 
//   })


  // useEffect(() => {
  //   const fetchPutPosts = async() => {
  //     const res = await fetch('http://localhost:3000/api/v1/posts', {
  //       method: 'PUT',
  //       headers
  //     })
  //     if(res.ok) {
  //       const data = await res.json()
  //       console.log(data);
        
  //     }
  //   }
  //   fetchPutPosts()
  // }, [])

  // ここで postData を useState に定義

  
  
 // 並び替え処理
// const handleToggleSortOrder = async (e: ChangeEvent<HTMLSelectElement>) => {
//   const sortOrder = e.target.value === "descending" ? "desc" : "asc";
//   const res = await fetch(`http://localhost:3000/api/v1/posts?sort_order=${sortOrder}`, { headers });
//   if (res.ok) {
//     const sortedData = await res.json();
//     console.log(sortedData); // 並び替えたデータを確認
//     setPostData(sortedData); // 状態に反映して再レンダリング
//   } else {
//     console.error("データ取得に失敗しました");
//   }
// };