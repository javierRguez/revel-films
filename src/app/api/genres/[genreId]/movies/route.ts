import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export async function GET(
  req: NextRequest,
  { params }: { params: { genreId: string } }
) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.error();
  }

  const res = await fetch(`${API_BASE_URL}/genres/${params.genreId}/movies`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.token}`,
    },
  });

  const moviesByGenre = await res.json();

  return NextResponse.json(moviesByGenre);
}
