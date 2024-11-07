import "./post.scss";
import { cookies } from "next/headers";
import Favorite from "@/app/components/elements/favorite/Favorite";
import Link from "next/link";

const post = async ({ params }: any) => {
  const { id } = params;

  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const res = await fetch(`http://api:3000/api/v1/posts/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token?.value}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  const { post } = data;
  console.log("postページのpostsは", post);
  // console.log(post.category_id)
  return (
    <div className="post">
      <ul className="postItem">
        <li>
          <Favorite
            postId={post.id}
            postFavoritesCount={post.favorites_count}
            initialFavorite={post.favorites}
          />
        </li>
        <li className="title">{post.title}</li>
        <li className="content">{post.content}</li>
        <li className="categories">カテゴリー：{post.category}</li>
        <li>{new Date(post.created_at).toLocaleDateString("ja-JP")}</li>
      </ul>
      <Link href={"/posts"}>
        <button className="backToTop">戻る</button>
      </Link>
    </div>
  );
};

export default post;

// postページのpostは {
//    id: 14,
//    title: 'id1の投稿',
//    content: 'id4の投稿です。',
//    created_at: '2024-10-26T08:27:56.378Z',
//    updated_at: '2024-10-28T09:44:58.221Z',
//    category_id: 2,
//    user_id: 1,
//    favorites_count: 1
//  }

// postsページのpostsは [
//    {
//      id: 14,
//      title: 'id1の投稿',
//      content: 'id4の投稿です。',
//      created_at: '2024-10-26T08:27:56.378Z',
//      updated_at: '2024-10-28T09:44:58.221Z',
//      category_id: 2,
//      user_id: 1,
//      favorites_count: 1,
//      favorites: false,
//      category: '趣味'
//    },
//    {
//      id: 15,
//      title: 'id4の投稿',
//      content: 'id4の投稿です。',
//      created_at: '2024-10-26T08:28:47.235Z',
//      updated_at: '2024-10-28T09:44:22.859Z',
//      category_id: 3,
//      user_id: 4,
//      favorites_count: 2,
//      favorites: true,
//      category: '仕事'
//    },
//    {
//      id: 17,
//      title: 'id1の投稿②',
//      content: 'id1の投稿②です。',
//      created_at: '2024-10-28T09:46:03.388Z',
//      updated_at: '2024-11-01T02:10:56.025Z',
//      category_id: 4,
//      user_id: 1,
//      favorites_count: 2,
//      favorites: true,
//      category: 'その他'
//    }
//  ]

// 'use client'

// import { useParams } from 'next/navigation'
// import './post.scss'
// import { useEffect } from 'react'
// import { getCookie } from '@/app/components/functions/getCookies'

// const post = () => {

//   const params = useParams()

//   useEffect(() => {
//     const fetchPost = async() => {
//     const token = getCookie('token')
//     const res = await fetch(`http://localhost:3000/api/v1/posts/${params.id}`, {
//       method: 'GET',
//       headers: {
//         "Authorization": `Bearer ${token}`,
//         "Content-Type": "application/json",
//       }
//     })

//     const data = await res.json()
//     console.log(data)
//     }
//     fetchPost()
//   }, [])

//   return (
//     <div>post</div>
//   )
// }

// export default post
