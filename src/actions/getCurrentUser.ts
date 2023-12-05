import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();
    if (session?.user?.token == null) {
      return null;
    }

    return {
      token: session?.user?.token,
    };
  } catch (error: any) {
    return null;
  }
}
