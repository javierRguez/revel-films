"use server";

import { getCurrentUser } from "./getCurrentUser";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export async function getMovieByGenreId(genreId: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.token) {
      return null;
    } else {
      const res = await fetch(`${API_BASE_URL}/genres/${genreId}/movies`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      const movieDetails = await res.json();
      return movieDetails;
    }
  } catch (error) {
    return null;
  }
}
