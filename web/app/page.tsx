import  { PostList } from "@/features/posts/components/postList/PostList";
import "./home.scss"


export default function Home() {
  return (
    <div className="home">
    <PostList />
    </div>
  );
}
