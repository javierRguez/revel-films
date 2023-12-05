"use server";

import { getCurrentUser } from "./getCurrentUser";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export async function getMovies() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.token) {
      return null;
    } else {
      const res = await fetch(`${API_BASE_URL}/movies`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      const movies = await res.json();
      return movies;
    }
  } catch (error) {
    return null;
  }
}
