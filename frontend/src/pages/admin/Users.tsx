import { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import useAuth from '../../hooks/useAuth';

const apiUrl = import.meta.env.VITE_API_URL;

type UserItem = {
  id: string;
  name: string;
  email: string;
  role?: string;
  active?: boolean;
};

export default function AdminUsers() {
  const { isAuthenticated } = useAuth();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selected, setSelected] = useState<UserItem | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<UserItem | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiUrl}/admin/users`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data.users || data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchUsers();
  }, [isAuthenticated]);

  const openEdit = (u: UserItem) => {
    setSelected(u);
    setIsEditOpen(true);
  };

  const saveUser = async (updates: Partial<UserItem>) => {
    if (!selected) return;
    try {
      const res = await fetch(`${apiUrl}/admin/users/${selected.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('Failed to update user');
      const updated = await res.json();
      setUsers((prev) => prev.map(p => p.id === selected.id ? updated.user || updated : p));
      setIsEditOpen(false);
      setSelected(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || 'Unknown error');
    }
  };

  const confirmDelete = (u: UserItem) => {
    setDeletingUser(u);
    setIsConfirmOpen(true);
  };

  const doDelete = async () => {
    if (!deletingUser) return;
    try {
      const res = await fetch(`${apiUrl}/admin/users/${deletingUser.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete user');
      setUsers((prev) => prev.filter(p => p.id !== deletingUser.id));
      setIsConfirmOpen(false);
      setDeletingUser(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || 'Unknown error');
    }
  };

  const total = users.length;
  const active = users.filter(u => u.active).length;
  const inactive = total - active;

  return (
    <div className="container mx-auto p-6 pt-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">View and manage users across the application</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="search"
            placeholder="Search by name or email"
            className="px-3 py-2 w-64 border rounded-md bg-gray-50 dark:bg-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-400"
            onChange={(e) => {
              const q = e.target.value.toLowerCase();
              if (!q) return fetchUsers();
              setUsers((prev) => prev.filter(u => (u.name || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q)));
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-white dark:bg-dark-200 shadow border-l-4 border-primary-500">
          <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
          <div className="text-2xl font-semibold mt-2">{loading ? '—' : total}</div>
        </div>
        <div className="p-4 rounded-lg bg-white dark:bg-dark-200 shadow border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
          <div className="text-2xl font-semibold mt-2 text-green-700">{loading ? '—' : active}</div>
        </div>
        <div className="p-4 rounded-lg bg-white dark:bg-dark-200 shadow border-l-4 border-rose-500">
          <h3 className="text-sm font-medium text-gray-500">Inactive Users</h3>
          <div className="text-2xl font-semibold mt-2 text-rose-600">{loading ? '—' : inactive}</div>
        </div>
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <div className="bg-white dark:bg-dark-200 p-4 rounded-lg shadow border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-200 divide-y divide-gray-100 dark:divide-gray-700">
              {loading ? (
                <tr><td colSpan={5} className="py-6 text-sm text-gray-500 text-center">Loading users...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={5} className="py-6 text-sm text-gray-500 text-center">No users found.</td></tr>
              ) : (
                users.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-dark-100">
                    <td className="px-4 py-4 align-middle">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{u.name}</div>
                    </td>
                    <td className="px-4 py-4 align-middle text-sm text-gray-600 dark:text-gray-300">{u.email}</td>
                    <td className="px-4 py-4 align-middle">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700">{u.role || 'user'}</span>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      {u.active ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">Active</span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">Inactive</span>
                      )}
                    </td>
                    <td className="px-4 py-4 align-middle text-sm">
                      <button className="px-3 py-1 mr-2 rounded-md bg-primary-50 text-primary-700 hover:bg-primary-100" onClick={() => openEdit(u)}>Edit</button>
                      <button className="px-3 py-1 rounded-md bg-rose-50 text-rose-700 hover:bg-rose-100" onClick={() => confirmDelete(u)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isEditOpen} onClose={() => { setIsEditOpen(false); setSelected(null); }}>
        {selected && (
          <div className="p-6 w-96 bg-white dark:bg-dark-200">
            <h3 className="text-lg font-semibold mb-3">Edit User</h3>
            <label className="block text-sm text-gray-600">Name</label>
            <input defaultValue={selected.name} id="edit-name" className="w-full border p-2 rounded mb-3 bg-gray-50 dark:bg-dark-100" />
            <label className="block text-sm text-gray-600">Email</label>
            <input defaultValue={selected.email} id="edit-email" className="w-full border p-2 rounded mb-3 bg-gray-50 dark:bg-dark-100" />
            <label className="block text-sm text-gray-600">Role</label>
            <select defaultValue={selected.role || 'user'} id="edit-role" className="w-full border p-2 rounded mb-3 bg-gray-50 dark:bg-dark-100">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked={selected.active} id="edit-active" /> Active</label>

            <div className="mt-4 flex justify-end gap-2">
              <button className="px-3 py-2 rounded-md border border-gray-200" onClick={() => { setIsEditOpen(false); setSelected(null); }}>Cancel</button>
              <button className="px-3 py-2 rounded-md bg-primary-600 text-white" onClick={() => {
                const name = (document.getElementById('edit-name') as HTMLInputElement).value;
                const email = (document.getElementById('edit-email') as HTMLInputElement).value;
                const role = (document.getElementById('edit-role') as HTMLSelectElement).value;
                const active = (document.getElementById('edit-active') as HTMLInputElement).checked;
                saveUser({ name, email, role, active });
              }}>Save</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={isConfirmOpen} onClose={() => { setIsConfirmOpen(false); setDeletingUser(null); }}>
        {deletingUser && (
          <div className="p-6 w-96 bg-white dark:bg-dark-200">
            <h3 className="text-lg font-semibold mb-3">Confirm delete</h3>
            <p className="text-sm text-gray-600">Are you sure you want to delete <strong>{deletingUser.name}</strong> ({deletingUser.email})? This action cannot be undone.</p>
            <div className="mt-4 flex justify-end gap-2">
              <button className="px-3 py-2 rounded-md border border-gray-200" onClick={() => { setIsConfirmOpen(false); setDeletingUser(null); }}>Cancel</button>
              <button className="px-3 py-2 rounded-md bg-rose-600 text-white" onClick={() => doDelete()}>Delete</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
