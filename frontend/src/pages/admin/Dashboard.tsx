import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-8 pt-20">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-sm text-gray-600 mb-6">Overview and quick actions for administrators.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/admin/users" className="p-6 border rounded-lg hover:shadow bg-gradient-to-r from-blue-400 to-green-500">
          <h2 className="text-xl font-semibold">User Management</h2>
          <p className="text-sm text-gray-500">View, edit roles, deactivate or delete users.</p>
        </Link>

        {/* <Link to="/admin/entities" className="p-4 border rounded hover:shadow">
          <h2 className="text-xl font-semibold">Data Explorer</h2>
          <p className="text-sm text-gray-500">Browse and edit core entities (chats, histories, remembers).</p>
        </Link>

        <Link to="/admin/settings" className="p-4 border rounded hover:shadow">
          <h2 className="text-xl font-semibold">Settings & Feature Flags</h2>
          <p className="text-sm text-gray-500">Toggle features and update system-level settings.</p>
        </Link>

        <Link to="/admin/audit" className="p-4 border rounded hover:shadow">
          <h2 className="text-xl font-semibold">Audit Logs</h2>
          <p className="text-sm text-gray-500">Review admin activity and important events.</p>
        </Link>

        <Link to="/admin/roles" className="p-4 border rounded hover:shadow">
          <h2 className="text-xl font-semibold">Roles & Permissions</h2>
          <p className="text-sm text-gray-500">Manage roles and access policies.</p>
        </Link> */}

      </div>
    </div>
  );
};

export default AdminDashboard;
