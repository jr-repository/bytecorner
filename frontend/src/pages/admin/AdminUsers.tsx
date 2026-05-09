import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/admin/PageHeader";
import { Modal } from "@/components/admin/Modal";
import { Trash2, Plus, Users as UsersIcon, Pencil } from "lucide-react";
import { toast } from "sonner";
import type { AdminUser } from "@/lib/storage";

const empty = (): AdminUser => ({ id: crypto.randomUUID(), name: "", email: "", role: "Editor", password: "" });

export default function AdminUsers() {
  const { users, setUsers } = useData();
  const [editing, setEditing] = useState<AdminUser | null>(null);

  const save = () => {
    if (!editing) return;
    if (!editing.name || !editing.email || !editing.password) return toast.error("All fields required");
    const exists = users.some((u) => u.id === editing.id);
    setUsers(exists ? users.map((u) => (u.id === editing.id ? editing : u)) : [...users, editing]);
    setEditing(null);
    toast.success("Saved");
  };

  const roleColor = (r: AdminUser["role"]) =>
    r === "Super Admin" ? "bg-violet-100 text-violet-700" : r === "Editor" ? "bg-sky-100 text-sky-700" : "bg-amber-100 text-amber-700";

  return (
    <>
      <PageHeader
        title="Team & Users"
        description="Manage admin accounts and access roles for the CMS."
        icon={<UsersIcon className="size-5" />}
        action={<Button onClick={() => setEditing(empty())}><Plus className="w-4 h-4" /> New User</Button>}
      />

      <div className="glass-strong rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/40 text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="text-left p-4">User</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Role</th>
                <th className="p-4 w-24"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-white/40 hover:bg-white/30">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-teal-gradient text-white grid place-items-center text-sm font-semibold">{u.name[0]?.toUpperCase()}</div>
                      <span className="font-medium">{u.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted">{u.email}</td>
                  <td className="p-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${roleColor(u.role)}`}>{u.role}</span></td>
                  <td className="p-4 text-right">
                    <button onClick={() => setEditing(u)} className="p-2 rounded-lg hover:bg-white/60"><Pencil className="size-4" /></button>
                    <button onClick={() => { setUsers(users.filter((x) => x.id !== u.id)); toast.success("Removed"); }} className="p-2 rounded-lg hover:bg-red-50 text-destructive"><Trash2 className="size-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!editing} title={editing && users.some((u) => u.id === editing.id) ? "Edit User" : "New User"} onClose={() => setEditing(null)} onSave={save} size="md">
        {editing && (
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="field-group sm:col-span-2"><label className="form-label">Name</label><input className="glass-input" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
            <div className="field-group sm:col-span-2"><label className="form-label">Email</label><input className="glass-input" type="email" value={editing.email} onChange={(e) => setEditing({ ...editing, email: e.target.value })} /></div>
            <div className="field-group"><label className="form-label">Password</label><input className="glass-input" type="password" value={editing.password} onChange={(e) => setEditing({ ...editing, password: e.target.value })} /></div>
            <div className="field-group"><label className="form-label">Role</label>
              <select className="glass-input" value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value as AdminUser["role"] })}>
                <option>Super Admin</option><option>Editor</option><option>Author</option>
              </select>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
