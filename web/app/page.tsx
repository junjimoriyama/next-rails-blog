// import  { PostList } from "@/features/posts/components/postList/PostList";
import "./home.scss"

import { redirect } from "next/navigation"; 

export default function Home() {
  redirect('/auth/login')
  return (
    <div className="home">
    </div>
  );
}
