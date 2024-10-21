"use client";

import { CategoryProps, editPostData } from "@/types";
import { useEffect, useState } from "react";
import { editPost } from "./actionEdit";
import { useParams } from "next/navigation";
import "./edit.scss";
import Link from "next/link";

// import { createPost } from "./actionEdit";


export default function EditPost() {

  const [ title, setTitle ] = useState('')
  const [ content, setContent ] = useState('')
  const [categoryData, setCategoryData] = useState<number>(0);  
  const [ categories, setCategories ] = useState([])

  // id取得
  const { id } = useParams()

  useEffect(() => {
    const getPosts = async() => {
      const res = await fetch(`http://localhost:3000/api/v1/posts/${id}`, {
      });
      const data = await res.json()
      setTitle(data.title)
      setContent(data.content)
      setCategoryData(data.category_id)
    }
    getPosts()

    const getCategories = async() => {
      const res = await  fetch(`http://localhost:3000/api/v1/categories/`, {
      });
      const data = await res.json()
      setCategories(data)
    }
    getCategories()
  }, [])

  return (
    <div className="edit">
      <h1>ブログ編集</h1>
      <form
      action={editPost}
      >
        <input type="hidden" name="id" value={id} />
        <label>タイトル:</label>
        <input
          className="titleInput"
          type="text"
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          // onChange={handleTitleChange}
        />
        <label>内容:</label>
        <textarea
        onChange={(e) => setContent(e.target.value)}
        // onChange={handleContentChange} 
        name='content'
        value={content}
        />

        <label>カテゴリー:</label>
        <div className="category">
          {categories.map((category: CategoryProps) => {
            return (
              <div className="eachCategory" key={category.id}>
                <input
                  type="radio"
                  id={String(category.id)}
                  name="categoryData"
                  value={categoryData}
                  checked={category.id === Number(categoryData)}
                  onChange={(e) => {
                    setCategoryData(Number(e.target.id))
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
      <Link href='/'>
      <button className="backTopBtn">
        戻る
      </button>
      </Link>
    </div>
  );
}
