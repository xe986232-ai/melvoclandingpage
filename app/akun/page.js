import Link from "next/link";
import { redirect } from "next/navigation";
import { SiteNavbar } from "@/components/ui/site-navbar";
import Footer from "@/components/Footer";
import SignOutButton from "@/components/SignOutButton";
import { navItems, mobileGroups } from "@/lib/nav";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const metadata = { title: "Akun" };
export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = createServerSupabaseClient();
  if (!supabase) redirect("/masuk");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/masuk?next=/akun");

  return (
    <main className="relative bg-base">
      <SiteNavbar navItems={navItems} mobileGroups={mobileGroups} />
      <div className="flex min-h-[70vh] items-center justify-center px-5 py-16">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl font-extrabold text-ink">Akun</h1>
          <p className="mt-2 font-body text-sm text-ink-muted">Kamu masuk sebagai</p>
          <p className="mt-1 break-all font-body text-base font-semibold text-ink">{user.email}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/plugin"
              className="inline-flex h-10 items-center justify-center rounded-full bg-ink-solid px-6 text-sm font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-ink-solid"
            >
              Lihat plugin
            </Link>
            <SignOutButton />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
