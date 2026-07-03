import { NextResponse } from "next/server";
import { fetchApplyAuditionBySlug } from "@/lib/applicationData";
import {
  getLineProfileByAccessToken,
  pushLineTextMessage,
  verifyLineIdToken
} from "@/lib/line";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

type ApplyRequest = {
  idToken?: string;
  accessToken?: string;
  auditionSlug?: string;
  sourceUrl?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ApplyRequest;

    if (!body.idToken || !body.auditionSlug) {
      return NextResponse.json(
        { ok: false, message: "idToken and auditionSlug are required" },
        { status: 400 }
      );
    }

    const audition = await fetchApplyAuditionBySlug(body.auditionSlug);

    if (!audition) {
      return NextResponse.json(
        { ok: false, message: "オーディションが見つかりません" },
        { status: 404 }
      );
    }

    const idProfile = await verifyLineIdToken(body.idToken);

    let lineUserId = idProfile.sub;
    let displayName: string | null = idProfile.name ?? null;
    let pictureUrl: string | null = idProfile.picture ?? null;

    if (body.accessToken) {
      try {
        const accessTokenProfile = await getLineProfileByAccessToken(body.accessToken);

        lineUserId = accessTokenProfile.userId || lineUserId;
        displayName = accessTokenProfile.displayName ?? displayName;
        pictureUrl = accessTokenProfile.pictureUrl ?? pictureUrl;
      } catch (profileError) {
        console.warn(profileError);
      }
    }

    const now = new Date().toISOString();

    const { error: userError } = await supabaseAdmin
      .from("line_users")
      .upsert(
        {
          line_user_id: lineUserId,
          display_name: displayName,
          picture_url: pictureUrl,
          updated_at: now,
          last_seen_at: now
        },
        {
          onConflict: "line_user_id"
        }
      );

    if (userError) {
      console.error(userError);
      return NextResponse.json(
        { ok: false, message: "LINEユーザー情報の保存に失敗しました" },
        { status: 500 }
      );
    }

    const { error: applicationError } = await supabaseAdmin
      .from("audition_applications")
      .upsert(
        {
          audition_slug: audition.slug,
          audition_title: audition.title,
          line_user_id: lineUserId,
          source_url: body.sourceUrl ?? null,
          status: "captured"
        },
        {
          onConflict: "audition_slug,line_user_id"
        }
      );

    if (applicationError) {
      console.error(applicationError);
      return NextResponse.json(
        { ok: false, message: "応募情報の保存に失敗しました" },
        { status: 500 }
      );
    }

    const messageText = [
      audition.applicationReplyMessage,
      audition.applicationExternalUrl ? "" : null,
      audition.applicationExternalUrl ? audition.applicationExternalUrl : null,
      "",
      "※このメッセージはアイドルオーディションナビ公式LINEからお送りしています。"
    ]
      .filter((item): item is string => Boolean(item))
      .join("\n");

    let pushMessageSent = false;
    let pushMessageError: string | null = null;

    try {
      await pushLineTextMessage({
        to: lineUserId,
        text: messageText
      });
      pushMessageSent = true;
    } catch (error) {
      console.error(error);
      pushMessageError =
        "公式LINEの友だち追加が完了していない、またはブロックされている可能性があります。画面上の案内から公式LINEを追加してください。";
    }

    return NextResponse.json({
      ok: true,
      audition,
      lineUser: {
        lineUserId,
        displayName,
        pictureUrl
      },
      pushMessageSent,
      pushMessageError
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        ok: false,
        message: "応募処理に失敗しました"
      },
      { status: 500 }
    );
  }
}
