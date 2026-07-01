import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200 px-6 py-4">
        <div className="text-lg font-semibold text-slate-900">BLUEPEAK AI OS</div>
      </header>
      <main className="px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
