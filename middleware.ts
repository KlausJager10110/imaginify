import { authMiddleware, clerkMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};