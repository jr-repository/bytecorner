import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Linkedin, Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 bg-brand-gradient">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-ink/70 leading-relaxed max-w-xs">
              Digital agency yang berfokus pada strategi, desain, dan teknologi untuk membantu bisnis bertumbuh di era digital.
            </p>
            <div className="mt-5 flex gap-2">
              {[Linkedin, Instagram, Facebook, Mail].map((Icon, i) => (
                <a key={i} href="#" className="size-9 rounded-full bg-white/60 hover:bg-white grid place-items-center transition">
                  <Icon className="size-4 text-ink" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-base font-semibold mb-4 text-ink">Layanan</h4>
            <ul className="space-y-2 text-sm text-ink/70">
              {["Strategi Digital","UI/UX Design","Web Development","Mobile Development","Digital Marketing","Company Profile","Landing Page"].map((x) => (
                <li key={x}><Link to="/services" className="hover:text-teal-deep">{x}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-semibold mb-4 text-ink">Perusahaan</h4>
            <ul className="space-y-2 text-sm text-ink/70">
              <li><Link to="/about" className="hover:text-teal-deep">Tentang Kami</Link></li>
              <li><Link to="/portfolio" className="hover:text-teal-deep">Portfolio</Link></li>
              <li><Link to="/articles" className="hover:text-teal-deep">Artikel</Link></li>
              <li><Link to="/contact" className="hover:text-teal-deep">Kontak</Link></li>
              <li><Link to="/admin/login" className="hover:text-teal-deep">Admin</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-semibold mb-4 text-ink">Hubungi Kami</h4>
            <ul className="space-y-3 text-sm text-ink/70">
              <li className="flex gap-2"><Phone className="size-4 mt-0.5" /> +62 812-3456-7890</li>
              <li className="flex gap-2"><Mail className="size-4 mt-0.5" /> hello@bytecorner.id</li>
              <li className="flex gap-2"><MapPin className="size-4 mt-0.5" /> Jl. Sudirman No.123, Jakarta Selatan, Indonesia 12190</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/30 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-ink/60">© {new Date().getFullYear()} ByteCorner.id. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-ink/60">
            <a href="#">Kebijakan Privasi</a>
            <a href="#">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
