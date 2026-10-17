import { Suspense } from "react";
import { SiteNavbar } from "@/components/ui/site-navbar";
import Footer from "@/components/Footer";
import LoginForm from "@/components/LoginForm";
import { navItems, mobileGroups } from "@/lib/nav";

export const metadata = { title: "Masuk" };

export default function Page() {
  return (
    <main className="relative bg-base">
      <SiteNavbar navItems={navItems} mobileGroups={mobileGroups} />
      <div className="flex min-h-[70vh] items-center justify-center px-5 py-16">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl font-extrabold text-ink">Masuk</h1>
          <p className="mt-2 mb-8 font-body text-sm text-ink-muted">
            Pakai akun yang sama dengan di aplikasi Melvoc.
          </p>
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
      <Footer />
    </main>
  );
}
