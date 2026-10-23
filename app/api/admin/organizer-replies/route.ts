import { requireAdmin } from '@/lib/adminAuth';
import { deliverOrganizerReplies } from '@/lib/organizerReplyDelivery';
export const dynamic = 'force-dynamic';
// Read-only: this route never sends LINE messages.
export async function GET() {
  await requireAdmin();
  return Response.json(await deliverOrganizerReplies(true), { headers: { 'Cache-Control': 'private, no-store' } });
}
