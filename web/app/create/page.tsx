'use client'

import { createPost } from "./actionCreate";

import { CategoryProps } from "@/types";
import { useEffect, useState } from "react";
import "./create.scss";

export default function CreatePost() {

  const [ title, setTitle ] = useState('')
  const [ content, setContent ] = useState('')
  const [ category, setCategory ] = useState('')
  const [ categories, setCategories ] = useState([])

  useEffect(() => {
    const getCategories = async() => {
      const res = await fetch("http://localhost:3000/api/v1/categories", {
        // title: title,
        // content: content,
      });
      const categoriesData = await res.json();
      setCategories(categoriesData)
    }
    getCategories()
  }, [])
  

  return (
    <div className="create">
      <h1>ブログ新規登録</h1>
      <form
      action={createPost}
      >
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
                  value={category.id}
                  id={category.id}
                  name="category"
                  onChange={(e) => {
                    setCategory(e.target.value)
                    console.log(e.target.value)
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
