import { Outlet } from 'react-router-dom';
import { useState } from 'react';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className={`fixed inset-y-0 left-0 z-20 w-72 bg-slate-900 p-6 text-white ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="mb-8 text-xl font-semibold">BLUEPEAK</div>
        <nav className="space-y-2 text-sm">
          <a href="/" className="block rounded-lg px-3 py-2 hover:bg-slate-800">Dashboard</a>
          <a href="/profile" className="block rounded-lg px-3 py-2 hover:bg-slate-800">Profile</a>
          <a href="/settings" className="block rounded-lg px-3 py-2 hover:bg-slate-800">Settings</a>
        </nav>
      </aside>
      <div className="md:ml-72">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <button type="button" onClick={() => setSidebarOpen((value) => !value)} className="md:hidden">☰</button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-600">Search</div>
            <div className="rounded-full bg-slate-100 px-3 py-2 text-sm">Theme</div>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
