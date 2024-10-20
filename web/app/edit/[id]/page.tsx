"use client";

import { CategoryProps } from "@/types";
import { useEffect, useState } from "react";
import { editPost } from "./actionEdit";
import { useParams } from "next/navigation";
import "./edit.scss";

// import { createPost } from "./actionEdit";


export default function EditPost() {

  const [ title, setTitle ] = useState('')
  const [ content, setContent ] = useState('')
  const [ category, setCategory ] = useState('')
  const [ categories, setCategories ] = useState([])

  const { id } = useParams();
  console.log(id)

  useEffect(() => {
  }, [])
  
  useEffect(() => {
    const getPosts = async() => {
      const res = await fetch("http://localhost:3000/api/v1/posts", {
      });
      const data = await res.json()
      console.log(data)
    
    }
    getPosts()
  }, [])
  

  return (
    <div className="edit">
      <h1>ブログ編集</h1>
      <form
      action={editPost}
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
