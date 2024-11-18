// next
import Link from "next/link";
import { redirect } from "next/navigation";
// type
import { postProps } from "@/types";
// components
import Header from "../components/layouts/header/Header";
import Favorite from "../components/elements/favorite/Favorite";
import DeleteBtn from "./delete/DeleteBtn";
// cookies
import { cookies } from "next/headers";
// style
import "./postList.scss";
import Avatar from "./components/Avatar";

export const PostList = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const headers = {
    Authorization: `Bearer ${token?.value}`,
    "Content-Type": "application/json",
  };

  // fetch関数
  const fetchData = async (url: string, method: string) => {
    const res = await fetch(url, { method, headers, credentials: "include" });
    if (res.ok) {
      return res.json();
    } else {
      redirect(`/`);
    }
  };

  // 全ての投稿データ
  const postData = await fetchData("http://api:3000/api/v1/posts", "GET");

  // 現在のユーザーのデータ
  const currentUserData = await fetchData("http://api:3000/api/v1/users/me","GET");

  // ユーザーのデータ
  const userData = await fetchData("http://api:3000/api/v1/users", "GET");


  return (
    <div className="posts">
      <Header />
      <div>
        <h1 className="heading">投稿一覧</h1>
        <Link href="posts/create">
          <div className="createBtn">新しく投稿する</div>
        </Link>
      </div>
      {/* <SortBtn postData={postData}/> */}
      <ul className="postList">
        {postData.map((post: postProps) => {
          // 投稿のuser_idに基づいてユーザーを検索
          const user = userData.find(
            (user: { id: number }) => user.id === post.user_id
          );

          return (
            <li key={post.id} className="postItem">
              <Link className='postItemLink' href={`users/${post.user_id}`}>
                <div className="userHeader">
                  <Avatar userId={post.user_id} />
                  <p className="username">
                    {user ? user.username : "不明なユーザー"}
                  </p>
                </div>
              </Link>

              <Favorite
                postId={post.id}
                postFavoritesCount={post.favorites_count}
                initialFavorite={post.favorites}
              />

              <Link href={`posts/${post.id}`}>
                <h2 className="title">{post.title}</h2>
              </Link>
              <p className="content">{post.content}</p>
              <p className="categories">
                <span>カテゴリー：{post.category}</span>
              </p>
              <p className="date">
                <span>
                  投稿日：
                  {new Date(post.created_at).toLocaleDateString("ja-JP")}
                </span>
              </p>
              {post.user_id === currentUserData.id && (
                <div className="btns">
                  <Link href={`posts/edit/${post.id}`}>
                    <button className="editBtn">編集</button>
                  </Link>
                  <DeleteBtn id={post.id} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PostList;