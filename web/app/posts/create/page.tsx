"use client";

// next
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
// react
import { useEffect, useState } from "react";
// type
import { CategoryProps } from "@/types";
// component
import { getCookie } from "@/app/components/functions/getCookies";
// style
import "./create.scss";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const token = getCookie('token') 
  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    // カテゴリー取得
    const fetchCategories = async () => {
      const res = await fetch("http://localhost:3000/api/v1/categories");
      const categoriesData = await res.json();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ページリロードを防ぐ
    createPost(); // ログイン関数を呼び出す
  };

  // ポスト作成
  const createPost = async () => {
    const res = await fetch("http://localhost:3000/api/v1/posts", {
      method: "POST",
      headers,
      body: JSON.stringify({
        post: {
          title: title,
          content: content,
          category_id: category,
        },
      }),
      credentials: "include" 
    });
    if (res.ok) {
      router.push("/posts");
      // 新しく作成した投稿を即時反映
      router.refresh();
    } else {
      throw new Error("ポスト作成に失敗しました");
    }
  };

  return (
    <div className="create">
      <h1>ブログ新規登録</h1>
      <form
        // action={createPost}
        onSubmit={onSubmit}
      >
        <label>タイトル:</label>
        <input
          className="titleInput"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>内容:</label>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          name="content"
          value={content}
        />

        <label>カテゴリー:</label>
        <div className="category">
          {categories.map((category: CategoryProps) => {
            return (
              <div className="eachCategory" key={category.id}>
                <input
                  type="radio"
                  value={category.id}
                  id={String(category.id)}
                  name="category"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                />
                <label>{category.name}</label>
              </div>
            );
          })}
        </div>
        <button className="submitBtn" type="submit">
          送信
        </button>
        <Link href="/posts">
          <button className="BackToPostsBtn">戻る</button>
        </Link>
      </form>
    </div>
  );
}
