import { useEffect, useState, type FormEvent } from "react";
import { UserCircle } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/Button";
import { ImageInput } from "@/components/ImageInput";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function AdminProfile() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Editor" as "Super Admin" | "Editor" | "Author",
    password: "",
    avatar: "",
  });

  useEffect(() => {
    if (!user) return;
    setForm({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "Editor",
      password: "",
      avatar: user.avatar || "",
    });
  }, [user]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const err = await updateProfile(form);
    if (err) toast.error(err);
    else {
      toast.success("Profile updated");
      setForm((current) => ({ ...current, password: "" }));
    }
  };

  return (
    <>
      <PageHeader
        title="Profile"
        description="Manage your admin identity, login details, and profile photo."
        icon={<UserCircle className="size-5" />}
      />

      <div className="glass-strong rounded-2xl p-6">
        <form onSubmit={submit} className="grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="field-group sm:col-span-2">
              <label className="form-label">Name</label>
              <input className="glass-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="field-group sm:col-span-2">
              <label className="form-label">Email</label>
              <input className="glass-input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="field-group">
              <label className="form-label">Role</label>
              <select className="glass-input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as typeof form.role })}>
                <option>Super Admin</option>
                <option>Editor</option>
                <option>Author</option>
              </select>
            </div>
            <div className="field-group">
              <label className="form-label">New Password</label>
              <input className="glass-input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Leave blank to keep current" />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" arrow>Save Profile</Button>
            </div>
          </div>

          <ImageInput value={form.avatar} onChange={(avatar) => setForm({ ...form, avatar })} label="Profile Photo" />
        </form>
      </div>
    </>
  );
}
