import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash } from "crypto";

const COOKIE_NAME = "idol_audition_admin_token";

function getAdminPassword() {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error("ADMIN_PASSWORD is not set");
  }

  return password;
}

export function getAdminToken() {
  return createHash("sha256")
    .update(`${getAdminPassword()}:idol-audition-navi-admin`)
    .digest("hex");
}

export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (token !== getAdminToken()) {
    redirect("/admin");
  }
}

export async function setAdminCookie() {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, getAdminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export async function clearAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
