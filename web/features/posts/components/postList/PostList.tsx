
import { postProps } from "@/types";
import Link from "next/link";
// style
import "./postList.scss";
import DeleteBtn from "./crudBtns/DeleteBtn";


export const PostList =  async() => {

  const res = await fetch("http://api:3000/api/v1/posts", {
    cache: "no-store",
  });
  const posts = await res.json();

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



// import Link from "next/link";
// import { PostsProps } from "../types";
// // style
// import "./posts.scss";
// import { DeleteBtn } from "./DeleteBtn";
// import { useEffect } from "react";
// import axios from "axios";
// import { Favorite } from "./favorite/Favorite";

// export async function Posts() {

//   const res = await fetch("http://localhost:3001/api/v1/posts", {
//     // next: { revalidate: 60 * 60 * 24 },
//     cache: "no-store",
//   });
//   const posts = await res.json();

//   try {
//     const sessionRes = await fetch("http://localhost:3001/api/v1/user/logged_in", {
//       credentials: "include",
//       method: 'GET',
//       redirect: "manual" 
//     })
//      // fetch の結果である res オブジェクトを使ってヘッダーを確認する
//   console.log(sessionRes.headers.get('X-Session-ID')); // ヘッダーの確認
//   console.log(Array.from(sessionRes.headers.entries()));

//     // const sessionRes = await axios.get("http://localhost:3001/api/v1/user/logged_in", {
//     //   withCredentials: true,
//     // });
    
//     const sessionData = await sessionRes.json();
//     console.log(sessionData); // sessionRes全体を表示してみる

  
//   } catch (error) {
//     console.error("Error fetching session data:", error);
//   }

//   return (
//     <div className="posts">
//       <div>
//         <h1 className="heading">投稿一覧</h1>
//         <Link href="create">
//           <div className="createBtn">新しく投稿する</div>
//         </Link>
//       </div>
//       <ul className="postList">
//         {posts.map((post: PostsProps) => (
//           <li key={post.id} className="postItem">
//             <Link href={`posts/${post.id}`}>
//               <h2 className="title">{`${post.title}`}</h2>
//             </Link>
//             <p className="content">{`${post.content}`}</p>
//             <p className="categories">
//               <span>カテゴリー：</span>
//               {Array.isArray(post.categories)
//                 ? post.categories.join(",")
//                 : JSON.parse(post.categories).join(",")}
//             </p>
//             <Favorite
//             postId={Number(post.id)}
//             />
//             <div className="btns">
//               <Link href={`edit/${post.id}`}>
//                 <button className="editBtn">編集</button>
//               </Link>

//               <DeleteBtn id={post.id} />
//               {/* <button
//                 className="deleteBtn"
//                 // onClick={() => handleDelete(post.id)}
//               >
//                 削除
//               </button> */}
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
// }
