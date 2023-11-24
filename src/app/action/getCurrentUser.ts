import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import client from "@/helpers/client";

export async function getSession() {
  return await getServerSession(authOptions);
  // 로그인 한 유저의 세션 정보
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }
    // 로그인 한 유저의 DB 정보
    const currentUser = await client.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        favs: true,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    console.error("Error in getCurrentUser", error);
    return null;
  }
}
