"use client";

import { createPost } from "./actionCreate";

import { CategoryProps } from "@/types";
import { useEffect, useState } from "react";
import "./create.scss";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getCookie } from "../components/functions/getCookies";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const { id } = useParams();

  const router = useRouter();

  const createPost = async () => {
    const token = getCookie("token");
    const res = await fetch("http://localhost:3000/api/v1/posts", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post: {
          title: title,
          content: content,
          category_id: category,
        },
      }),
    });
    if (res.ok) {
      router.push("/posts");
      // 新しく作成した投稿を即時反映
      router.refresh(); 
    } else {
      const errorData = await res.json();
      console.error("APIエラー:", errorData);
      throw new Error("失敗しました");
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("http://localhost:3000/api/v1/categories", {
      });
      const categoriesData = await res.json();
      setCategories(categoriesData);
    };
    getCategories();
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ページリロードを防ぐ
    createPost(); // ログイン関数を呼び出す
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
          // onChange={handleTitleChange}
        />
        <label>内容:</label>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          // onChange={handleContentChange}
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
      </form>
    </div>
  );
}
