import { randomUUID } from 'node:crypto';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { organizerPostSlot } from '@/lib/organizerPostSchedule';
import queue from '@/content/organizer-posts/2026-10-22.json';

export const ORGANIZER_POST_BUCKET = 'organizer-post-deliveries';
const storage = () => supabaseAdmin.storage.from(ORGANIZER_POST_BUCKET);
type Delivery = { text: string; recipient: string; retryKey: string; createdAt: string };
async function readJson<T>(path: string): Promise<T | null> {
  const { data, error } = await storage().download(path);
  if (error) {
    if (/not found/i.test(error.message)) return null;
    throw new Error('Delivery storage read failed');
  }
  return JSON.parse(await data.text()) as T;
}
export async function deliverOrganizerPosts(dryRun = false, now = new Date()) {
  let slot = organizerPostSlot(queue.startDate, now);
  const recipient = process.env.ADMIN_LINE_USER_ID;
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!recipient || !token) throw new Error('LINE not configured');
  if (!slot && dryRun) {
    for (let hours = 1; hours <= 24 && !slot; hours++) {
      slot = organizerPostSlot(queue.startDate, new Date(now.getTime() + hours * 3600000));
    }
  }
  if (!slot) return { ok: true, skipped: 'outside_schedule' };
  const batch = queue.batches[slot.index];
  const exhausted = !batch;
  const key = `${queue.id}/${exhausted ? 'exhausted' : slot.id}`;
  const text = batch
    ? batch.join('\n\n')
    : '【X投稿案の補充が必要です】\n用意した7日分・84案の配信が終了しました。同じ案の繰り返し配信はせず、補充まで停止します。Codexで次の投稿案の補充を依頼してください。';
  if (dryRun) {
    const bucket = await supabaseAdmin.storage.getBucket(ORGANIZER_POST_BUCKET);
    if (bucket.error || bucket.data.public) throw new Error('Private delivery bucket unavailable');
    return { ok: true, slot: slot.id, index: slot.index, exhausted, text };
  }
  if (await readJson(`${key}.sent.json`)) return { ok: true, skipped: 'already_sent' };
  let record = await readJson<Delivery>(`${key}.json`);
  if (!record) {
    const proposed: Delivery = { text, recipient, retryKey: randomUUID(), createdAt: now.toISOString() };
    // Immutable create elects one body/retry key even with simultaneous cron calls.
    const result = await storage().upload(`${key}.json`, JSON.stringify(proposed), { contentType: 'application/json', upsert: false });
    record = await readJson<Delivery>(`${key}.json`);
    if (!record) throw new Error(result.error ? 'Delivery record create failed' : 'Delivery record unavailable');
  }
  if (record.recipient !== recipient) throw new Error('Recipient changed; manual review required');
  if (now.getTime() - Date.parse(record.createdAt) > 23 * 3600000) throw new Error('Old ambiguous delivery requires manual review');
  const response = await fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'X-Line-Retry-Key': record.retryKey },
    body: JSON.stringify({ to: record.recipient, messages: [{ type: 'text', text: record.text }] }),
    signal: AbortSignal.timeout(20000)
  });
  if (!response.ok && !(response.status === 409 && response.headers.has('x-line-accepted-request-id'))) throw new Error(`LINE HTTP ${response.status}`);
  const saved = await storage().upload(`${key}.sent.json`, JSON.stringify({ acceptedAt: new Date().toISOString() }), { contentType: 'application/json', upsert: false });
  if (saved.error && !(await readJson(`${key}.sent.json`))) throw new Error('LINE accepted but delivery marker failed');
  return { ok: true, accepted: true, slot: slot.id, exhausted };
}
