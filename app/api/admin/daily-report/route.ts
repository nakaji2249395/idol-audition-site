import { requireAdmin } from "@/lib/adminAuth";
import { createDailyReport } from "@/lib/dailyReport";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

// Read-only preview. Visiting this route never sends a LINE message.
export async function GET() {
  await requireAdmin();
  const report = await createDailyReport();
  return Response.json(report, { headers: { "Cache-Control": "private, no-store" } });
}
