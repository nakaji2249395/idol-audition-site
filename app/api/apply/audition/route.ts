import { NextResponse } from "next/server";
import { fetchApplyAuditionBySlug } from "@/lib/applicationData";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { ok: false, message: "slug is required" },
      { status: 400 }
    );
  }

  const audition = await fetchApplyAuditionBySlug(slug);

  if (!audition) {
    return NextResponse.json(
      { ok: false, message: "オーディションが見つかりません" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ok: true,
    audition
  });
}
