import { NextResponse } from "next/server";
import {
  normalizeApplicationDestination,
  verifyApplicationTrackingSignature
} from "@/lib/applicationTracking";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const signature = new URL(request.url).searchParams.get("signature") || "";

  if (!signature || !verifyApplicationTrackingSignature(id, signature)) {
    return new NextResponse("リンクが無効です", { status: 404 });
  }

  const { data: application, error } = await supabaseAdmin
    .from("audition_applications")
    .select("application_external_url, external_clicked_at")
    .eq("id", id)
    .single();

  const destination = normalizeApplicationDestination(
    application?.application_external_url || ""
  );

  if (error || !destination) {
    console.error("Application tracking destination lookup failed", error);
    return new NextResponse("応募先が見つかりません", { status: 404 });
  }

  if (!application.external_clicked_at) {
    const { error: updateError } = await supabaseAdmin
      .from("audition_applications")
      .update({
        external_clicked_at: new Date().toISOString(),
        status: "external_opened"
      })
      .eq("id", id)
      .is("external_clicked_at", null);

    if (updateError) {
      console.error("Application tracking click update failed", updateError);
    }
  }

  return NextResponse.redirect(destination, {
    status: 302,
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
