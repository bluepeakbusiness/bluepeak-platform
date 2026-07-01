export default function DangerButton({ children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
