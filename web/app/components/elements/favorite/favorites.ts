"use server"
import { headers } from "next/headers";

export async function fetchPostFavorites(postId: number) {
  const token = headers().get("authorization");
  const res = await fetch(`http://localhost:3000/api/v1/posts/${postId}`, {
    method: "GET",
    headers: {
      Authorization: token || "",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch post favorites.");
  }

  return res.json();
}

export async function toggleFavorite(postId: number, isFavorited: boolean) {
  const token = headers().get("authorization");
  const method = isFavorited ? "DELETE" : "POST";

  const res = await fetch(`http://localhost:3000/api/v1/posts/${postId}/favorite`, {
    method,
    headers: {
      Authorization: token || "",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to toggle favorite.");
  }
}
