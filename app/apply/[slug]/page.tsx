import { redirect } from "next/navigation";
import { getApplyUrl } from "@/lib/applyUrl";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LegacyApplyPage({ params }: PageProps) {
  const { slug } = await params;
  redirect(getApplyUrl(slug));
}
