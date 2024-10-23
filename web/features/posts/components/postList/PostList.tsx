'use client'; // クライアントコンポーネントとして指定

import { postProps } from "@/types";
import Link from "next/link";
import "./postList.scss";
import DeleteBtn from "./crudBtns/DeleteBtn";
import { useEffect, useState } from "react";

export const PostList = () => {
  const [posts, setPosts] = useState<postProps[]>([]);

  useEffect(() => {
    // ローカルストレージからトークンを取得
    const token = localStorage.getItem('token');

    const fetchPosts = async () => {
      const res = await fetch("http://localhost:3000/api/v1/posts", {
        method: 'GET',
        headers: {
          // "Authorization": `Bearer ${token}`,  // Authorizationヘッダーにトークンを追加
          "Content-Type": "application/json"
        },
        cache: "no-store",
        credentials: 'include'
      });

      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      } else {
        console.error('投稿の取得に失敗しました');
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="posts">
      <div>
        <h1 className="heading">投稿一覧</h1>
        <Link href="create">
          <div className="createBtn">新しく投稿する</div>
        </Link>
      </div>
      <ul className="postList">
        {posts.map((post: postProps) => (
          <li key={post.id} className="postItem">
            <Link href={`posts/${post.id}`}>
              <h2 className="title">{`${post.title}`}</h2>
            </Link>
            <p className="content">{`${post.content}`}</p>
            <p className="categories">
              <span>カテゴリー：{post.category.name}</span>
            </p>
            <p className="date">
              <span>投稿日：{new Date(post.created_at).toLocaleDateString('ja-JP')}</span>
            </p>
            <div className="btns">
              <Link href={`edit/${post.id}`}>
                <button className="editBtn">編集</button>
              </Link>
              <DeleteBtn id={post.id} />
            </div>
          </li>
        ))}
      </ul>
      <Link href={"auth/signup"}>
        <button className="editBtn">signup</button>
      </Link>
      <Link href={"auth/login"}>
        <button className="editBtn">login</button>
      </Link>
    </div>
  );
};

export default PostList;




// import { postProps } from "@/types";
// import Link from "next/link";
// // style
// import "./postList.scss";
// import DeleteBtn from "./crudBtns/DeleteBtn";


// export const PostList =  async() => {

//   const res = await fetch("http://api:3000/api/v1/posts", {
//     cache: "no-store",
//     credentials: 'include'
//   });
//   const posts = await res.json();

//   return (
//     <div className="posts">
//       <div>
//         <h1 className="heading">投稿一覧</h1>
//         <Link href="create">
//           <div className="createBtn">新しく投稿する</div>
//         </Link>
//       </div>
//       <ul className="postList">
//         {posts.map((post: postProps) => (
//           <li key={post.id} className="postItem">
//             <Link href={`posts/${post.id}`}>
//               <h2 className="title">{`${post.title}`}</h2>
//             </Link>
//             <p className="content">{`${post.content}`}</p>
//             <p className="categories">
//               <span>カテゴリー：{post.category.name}</span>
//             </p>
//             <p className="date">
//               <span>投稿日：{new Date(post.created_at).toLocaleDateString('ja-JP')}</span>
//             </p>
//             <div className="btns">
//               <Link href={`edit/${post.id}`}>
//                 <button className="editBtn">編集</button>
//               </Link>
//               <DeleteBtn id={post.id} />
//             </div>
//           </li>
//         ))}
//       </ul>
//       <Link href={"auth/signup"}>
//         <button className="editBtn">signup</button>
//       </Link>
//       <Link href={"auth/login"}>
//         <button className="editBtn">login</button>
//       </Link>
//     </div>
//   );
// };

// export default PostList;