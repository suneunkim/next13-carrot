import bcrypt from "bcryptjs";
import prisma from "@/helpers/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  // 존재하는 이메일이면 클라이언트에서 표시해주기 추가해야 함
  if (existingUser) {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 400 }
    );
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });
  return NextResponse.json({ ok: true, user });
  // 아래처럼도 사용 할 수 있음.
  return new Response("User registered successfully", { status: 200 });
}
