import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export async function POST(
  req: NextRequest,
  { params }: { params: { movieId: string } }
) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.error();
  }

  const res = await fetch(`${API_BASE_URL}/user/list`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.token}`,
    },
    body: JSON.stringify({ id: params.movieId }),
  });

  const userMoviesList = await res.json();

  return NextResponse.json(userMoviesList);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { movieId: string } }
) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.error();
  }

  const res = await fetch(`${API_BASE_URL}/user/list/${params.movieId}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.token}`,
    },
  });

  const userMoviesList = await res.json();

  return NextResponse.json(userMoviesList);
}
