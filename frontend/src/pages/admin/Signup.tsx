import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";
import { toast } from "sonner";

export default function Signup() {
  const { signup } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err = signup(name, email, password);
    if (err) toast.error(err); else { toast.success("Account created"); nav("/admin"); }
  };
  return (
    <div className="min-h-screen grid place-items-center bg-brand-soft p-6">
      <form onSubmit={submit} className="glass-strong rounded-3xl p-8 w-full max-w-md space-y-4">
        <Logo />
        <h2 className="font-display text-2xl font-bold mt-4">Create Account</h2>
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm" />
        <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm" />
        <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm" />
        <Button type="submit" arrow className="w-full justify-center">Sign Up</Button>
        <p className="text-xs text-center text-muted">Already have an account? <Link to="/admin/login" className="text-teal-deep font-medium">Sign in</Link></p>
      </form>
    </div>
  );
}
