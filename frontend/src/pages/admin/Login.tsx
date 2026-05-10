import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";
import { toast } from "sonner";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("admin@bytecorner.id");
  const [password, setPassword] = useState("admin123");
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const err = await login(email, password);
    if (err) toast.error(err); else { toast.success("Welcome back!"); nav("/admin"); }
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-brand-soft">
      <div className="hidden lg:flex flex-col justify-between p-10 bg-teal-gradient text-white">
        <Logo withText />
        <div>
          <h1 className="font-display text-4xl font-bold">Welcome to ByteCorner.id Admin</h1>
          <p className="mt-3 text-white/90">Manage services, portfolio, articles and more.</p>
        </div>
        <p className="text-xs text-white/70">© ByteCorner.id</p>
      </div>
      <div className="flex items-center justify-center p-6">
        <form onSubmit={submit} className="glass-strong rounded-3xl p-8 w-full max-w-md space-y-4">
          <h2 className="font-display text-2xl font-bold">Sign In</h2>
          <p className="text-sm text-muted">Use admin@bytecorner.id / admin123</p>
          <div>
            <label className="text-xs font-medium">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-1 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm" />
          </div>
          <div>
            <label className="text-xs font-medium">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-1 w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm" />
          </div>
          <Button type="submit" arrow className="w-full justify-center">Sign In</Button>
          <p className="text-xs text-center text-muted">No account? <Link to="/admin/signup" className="text-teal-deep font-medium">Sign up</Link></p>
        </form>
      </div>
    </div>
  );
}
