"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./getCurrentUser";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export async function addMovieToUserList(movieId: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.token) {
      return null;
    } else {
      const res = await fetch(`${API_BASE_URL}/user/list`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({ id: movieId }),
      });
      revalidatePath("/");
      const userMovies = await res.json();
      return userMovies;
    }
  } catch (error) {
    return null;
  }
}
