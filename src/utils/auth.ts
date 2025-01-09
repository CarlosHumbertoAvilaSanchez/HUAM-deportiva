import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.SUPABASE_SECRET_JWT_KEY)
    );
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getPermissionsFromRequest(req: NextRequest) {
  const headers = new Headers(req.headers);
  const authHeader = headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  const decodedToken = (await verifyToken(token)) as any;

  return decodedToken ? (decodedToken.permissions as string[]) : null;
}
