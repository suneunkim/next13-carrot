import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.JWT_SECRET });
  const pathname = req.nextUrl.pathname;

  // session 없다면 로그인 안한 상태
  if (!session) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "authentication failed" }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }

  // 로그인 한 유저는 /auth 이하의 /login, /register 접근 불가, &&가 ||보다 높은 우선순위
  if (pathname.startsWith("/auth") && session) {
    // return NextResponse.redirect("/"); 상대 경로. 현재 도메인의 루트로 이동
    return NextResponse.redirect(new URL("/", req.nextUrl).toString());
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
