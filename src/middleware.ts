import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { getPermissionsFromRequest } from "@/utils/auth";

export async function middleware(request: NextRequest) {
  const sessionResponse = await updateSession(request);

  if (sessionResponse.headers.get("location")) {
    return sessionResponse;
  }
  if (request.nextUrl.pathname.startsWith("/api/stripe/")) {
    const permissions = await getPermissionsFromRequest(request);
    if (!permissions || !permissions.includes("event.create")) {
      return NextResponse.json(
        {
          error: "Forbidden: Insufficient: permission",
        },
        { status: 403 }
      );
    }
  }

  return sessionResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
