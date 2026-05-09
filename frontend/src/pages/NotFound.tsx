import { LinkButton } from "@/components/Button";
import { Logo } from "@/components/Logo";
export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-brand-soft px-6 text-center">
      <div>
        <Logo />
        <h1 className="mt-8 font-display text-7xl font-bold text-teal-deep">404</h1>
        <p className="mt-2 text-muted">Halaman tidak ditemukan.</p>
        <LinkButton to="/" arrow className="mt-6">Kembali ke Beranda</LinkButton>
      </div>
    </div>
  );
}
