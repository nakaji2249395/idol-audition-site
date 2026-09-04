export type LineVerifyProfile = {
  sub: string;
  name?: string;
  picture?: string;
  aud?: string;
};

export type LineProfile = {
  userId: string;
  displayName?: string;
  pictureUrl?: string;
  statusMessage?: string;
};

type LineBotInfo = {
  basicId: string;
  premiumId?: string;
};

export async function getLineOfficialAccountChatUrl() {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;

  if (!token) return null;

  const response = await fetch("https://api.line.me/v2/bot/info", {
    headers: {
      Authorization: `Bearer ${token}`
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`LINE bot info fetch failed: ${text}`);
  }

  const bot = (await response.json()) as LineBotInfo;
  const officialAccountId = bot.premiumId || bot.basicId;

  if (!officialAccountId) return null;

  return `https://line.me/R/oaMessage/${encodeURIComponent(officialAccountId)}`;
}

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

export async function getLineProfileByAccessToken(accessToken: string): Promise<LineProfile> {
  const channelId = process.env.LINE_LOGIN_CHANNEL_ID;

  if (!channelId) {
    throw new Error("LINE_LOGIN_CHANNEL_ID is not set");
  }

  const verifyResponse = await fetch(
    `https://api.line.me/oauth2/v2.1/verify?access_token=${encodeURIComponent(accessToken)}`
  );

  if (!verifyResponse.ok) {
    const text = await verifyResponse.text();
    throw new Error(`LINE access token verify failed: ${text}`);
  }

  const verifyResult = (await verifyResponse.json()) as {
    client_id?: string;
    expires_in?: number;
    scope?: string;
  };

  if (verifyResult.client_id && verifyResult.client_id !== channelId) {
    throw new Error("LINE access token client_id mismatch");
  }

  const profileResponse = await fetch("https://api.line.me/v2/profile", {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!profileResponse.ok) {
    const text = await profileResponse.text();
    throw new Error(`LINE profile fetch failed: ${text}`);
  }

  const profile = (await profileResponse.json()) as LineProfile;

  if (!profile.userId) {
    throw new Error("LINE profile userId was not returned");
  }

  return profile;
}

export async function getLineProfileByMessagingApi(lineUserId: string): Promise<LineProfile> {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;

  if (!token) {
    throw new Error("LINE_CHANNEL_ACCESS_TOKEN is not set");
  }

  const response = await fetch(
    `https://api.line.me/v2/bot/profile/${encodeURIComponent(lineUserId)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`LINE Messaging API profile fetch failed: ${text}`);
  }

  const profile = (await response.json()) as LineProfile;

  if (!profile.userId) {
    throw new Error("LINE Messaging API profile userId was not returned");
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
