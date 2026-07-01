export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="mb-4 text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 ? <span>/</span> : null}
            <span className={index === items.length - 1 ? 'font-semibold text-slate-700' : ''}>{item.label}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
