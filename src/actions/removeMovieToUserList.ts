"use server";

import { getCurrentUser } from "./getCurrentUser";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export async function removeMovieToUserList(movieId: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.token) {
      return null;
    } else {
      const res = await fetch(`${API_BASE_URL}/user/list/${movieId}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      const userMovies = await res.json();
      return userMovies;
    }
  } catch (error) {
    return null;
  }
}
