import { deliverOrganizerPosts } from '@/lib/organizerPostDelivery';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return Response.json({ error: 'Cron not configured' }, { status: 503 });
  if (request.headers.get('authorization') !== `Bearer ${secret}`) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    return Response.json(await deliverOrganizerPosts(new URL(request.url).searchParams.get('dryRun') === '1'), { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Delivery failed';
    console.error(JSON.stringify({ event: 'organizer_posts_failed', message }));
    return Response.json({ error: message }, { status: 500 });
  }
}
