export default function SecondaryButton({ children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
