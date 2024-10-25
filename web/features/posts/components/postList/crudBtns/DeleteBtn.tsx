"use client";

import { DeleteBtnProps } from "@/types";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { getCookie } from "@/app/components/functions/getCookies";

const DeleteBtn = ({id}: DeleteBtnProps) => {

  const router = useRouter()
  const handleDelete = async () => {
    const token = getCookie('token')
    const res = await fetch(`http://localhost:3000/api/v1/posts/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if(res.ok) {
      // 削除された後を反映
      router.refresh()
    }
  };

  return (
    <button className="deleteBtn" onClick={handleDelete}>
      削除
    </button>
  );
};

export default DeleteBtn;




// "use client";

// import { DeleteBtnProps } from "@/types";
// import { redirect } from "next/navigation";
// import { cookies } from "next/headers";
// // import { useRouter } from "next/navigation";

// const DeleteBtn = ({id}: DeleteBtnProps) => {
//   const cookieStore = cookies();
//   const token = cookieStore.get("token");
  
//   const handleDelete = async () => {
//     const res = await fetch(`http://localhost:3000/api/v1/posts/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Authorization": `Bearer ${token?.value}`
//       }
//     });
//     if(res.ok) {
//       // 削除された後を反映
//       redirect('/posts');
//     }
//   };

//   return (
//     <button className="deleteBtn" onClick={handleDelete}>
//       削除
//     </button>
//   );
// };

// export default DeleteBtn;

