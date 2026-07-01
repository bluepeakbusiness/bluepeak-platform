import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function MainLayout({ children }) {
  return (
    <div className="layout">

      <Sidebar />

      <main className="main">

        <Topbar />

        {children}

      </main>

    </div>
  );
}