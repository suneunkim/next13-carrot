import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Sesssion {
    user?: {
      id?: string; // 자동완성에 id도 추가하기.
    } & DefaultSession["user"]; // 기존 자동완성 타입
  }
}
