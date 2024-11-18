"use client";

// next
import { useParams } from "next/navigation";
import Link from "next/link";
// react
import { useEffect, useState } from "react";
// type
import { CategoryProps, editPostData } from "@/types";
// components
import { editPost } from "./actionEdit";
import { getCookie } from "@/app/components/functions/getCookies";
// style
import "./edit.scss";


export default function EditPost() {

  const [ title, setTitle ] = useState('')
  const [ content, setContent ] = useState('')
  const [categoryData, setCategoryData] = useState<number | null>(null);  
  const [ categories, setCategories ] = useState([])

  const token = getCookie('token') 

  // id取得
  const { id } = useParams()

  useEffect(() => {
    // 編集用ポストデータ反映
    const fetchPostData = async() => {
      const res = await fetch(`http://localhost:3000/api/v1/posts/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      const postsData = await res.json()
      setTitle(postsData.post.title)
      setContent(postsData.post.content)
      setCategoryData(postsData.post.category_id)
    }
    fetchPostData()
    // カテゴリー取得
    const fetchCategories = async() => {
      const res = await  fetch("http://localhost:3000/api/v1/categories/");
      const categoriesData = await res.json()
      setCategories(categoriesData)
    }
    fetchCategories()
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
                  value={categoryData ?? ''}
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
          変更
        </button>
      </form>
      <Link href='/posts'>
      <button className="backTopBtn">
        戻る
      </button>
      </Link>
    </div>
  );
}
