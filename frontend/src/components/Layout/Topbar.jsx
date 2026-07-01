import { FiBell, FiSearch, FiUser } from 'react-icons/fi';

export default function Topbar() {
  return (
    <header className="topbar">

      <h2>
        Chairman Dashboard
      </h2>

      <div className="top-actions">

        <FiSearch />

        <FiBell />

        <FiUser />

      </div>

    </header>
  );
}