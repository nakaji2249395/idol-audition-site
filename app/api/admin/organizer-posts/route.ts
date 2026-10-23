import { requireAdmin } from '@/lib/adminAuth';
import { deliverOrganizerPosts } from '@/lib/organizerPostDelivery';
export const dynamic = 'force-dynamic';
// Read-only: this route never sends LINE messages.
export async function GET() {
  await requireAdmin();
  return Response.json(await deliverOrganizerPosts(true), { headers: { 'Cache-Control': 'private, no-store' } });
}
