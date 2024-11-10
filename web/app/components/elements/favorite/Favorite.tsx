'use client'

import React, { useEffect, useState } from 'react'
import './favorite.scss'
import { getCookie } from '../../functions/getCookies'

const Favorite = ({postId, postFavoritesCount, initialFavorite}: {postId:number, postFavoritesCount:number, initialFavorite:boolean}) => {

  const [ count, setCount ] = useState(postFavoritesCount)
  const [ isFavorited, setIsFavorited ] = useState(initialFavorite)

  const handleClickFavorite = async () => {
    const token = getCookie("token")
    const method = isFavorited ? "DELETE" : "POST"
    await fetch(`http://localhost:3000/api/v1/posts/${postId}/favorite`, {
      method: method,
      headers: {
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    })
    setIsFavorited(!isFavorited)

    const countRes = await fetch(`http://localhost:3000/api/v1/posts/`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    const data = await countRes.json()
    // 現在の投稿
    const currentPost = data.posts.find((post: {id: number}) => postId === post.id)
    // 現在の投稿を表示
    setCount(currentPost.favorites_count)
  }

  return (
    <div className='favorite'>
  <svg 
onClick={handleClickFavorite}
height="20" viewBox="0 0 100 100" width="20" xmlns="http://www.w3.org/2000/svg">
<path
className={`${isFavorited ? 'isActive' : ''}`}
d="m25.5 31.7h49v49h-49z" transform="matrix(.70710678 -.70710678 .70710678 .70710678 -25.1 51.8)" />
<path 
className={`${isFavorited ? 'isActive' : ''}`}
d="m50 22.3 33.9 33.9-33.9 33.9-33.9-33.9zm0-1.4-35.4 35.3 35.4 35.4 35.4-35.4z" />
<path 
className={`${isFavorited ? 'isActive' : ''}`}
d="m67.7 63c-6.5 0-12.7-2.5-17.3-7.2-4.6-4.6-7.2-10.8-7.2-17.3s2.5-12.7 7.2-17.3 10.8-7.2 17.3-7.2 12.7 2.5 17.3 7.2c4.6 4.6 7.2 10.8 7.2 17.3s-2.5 12.7-7.2 17.3c-4.6 4.6-10.8 7.2-17.3 7.2z" />
<path 
className={`${isFavorited ? 'isActive' : ''}`}
d="m67.7 14.5c6.4 0 12.4 2.5 17 7 9.4 9.4 9.4 24.6 0 33.9-4.5 4.5-10.6 7-17 7s-12.4-2.5-17-7c-9.4-9.4-9.4-24.6 0-33.9 4.5-4.5 10.6-7 17-7m0-1c-6.4 0-12.8 2.4-17.7 7.3-9.8 9.8-9.8 25.6 0 35.4 4.9 4.9 11.3 7.3 17.7 7.3s12.8-2.4 17.7-7.3c9.8-9.8 9.8-25.6 0-35.4s-11.3-7.3-17.7-7.3z" />
<path 
className={`${isFavorited ? 'isActive' : ''}`}
d="m32.3 63c-6.5 0-12.7-2.5-17.3-7.2-9.6-9.6-9.6-25.1 0-34.6 4.6-4.6 10.8-7.2 17.3-7.2s12.7 2.5 17.3 7.2 7.2 10.8 7.2 17.3-2.5 12.7-7.2 17.3c-4.6 4.6-10.8 7.2-17.3 7.2z" />
<path 
className={`${isFavorited ? 'isActive' : ''}`}
d="m32.3 14.5c6.4 0 12.4 2.5 17 7 9.4 9.4 9.4 24.6 0 33.9-4.5 4.5-10.6 7-17 7s-12.4-2.5-17-7c-9.4-9.4-9.4-24.6 0-33.9 4.5-4.5 10.6-7 17-7m0-1c-6.4 0-12.8 2.4-17.7 7.3-9.8 9.8-9.8 25.6 0 35.4 4.9 4.9 11.3 7.3 17.7 7.3s12.8-2.4 17.7-7.3c9.8-9.8 9.8-25.6 0-35.4-4.9-4.9-11.3-7.3-17.7-7.3z" />
</svg>
{
// いいねの数表示
<div className="favoriteCount">{count}</div>
}
    </div>
  )
}

export default Favorite