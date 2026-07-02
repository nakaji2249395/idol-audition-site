export type LineVerifyProfile = {
  sub: string;
  name?: string;
  picture?: string;
  aud?: string;
};

export async function verifyLineIdToken(idToken: string): Promise<LineVerifyProfile> {
  const channelId = process.env.LINE_LOGIN_CHANNEL_ID;

  if (!channelId) {
    throw new Error("LINE_LOGIN_CHANNEL_ID is not set");
  }

  const response = await fetch("https://api.line.me/oauth2/v2.1/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      id_token: idToken,
      client_id: channelId
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`LINE ID token verify failed: ${text}`);
  }

  const profile = (await response.json()) as LineVerifyProfile;

  if (!profile.sub) {
    throw new Error("LINE user id was not returned");
  }

  if (profile.aud && profile.aud !== channelId) {
    throw new Error("LINE ID token audience mismatch");
  }

  return profile;
}

export async function pushLineTextMessage({
  to,
  text
}: {
  to: string;
  text: string;
}) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;

  if (!token) {
    throw new Error("LINE_CHANNEL_ACCESS_TOKEN is not set");
  }

  const response = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      to,
      messages: [
        {
          type: "text",
          text
        }
      ]
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`LINE push message failed: ${text}`);
  }
}
