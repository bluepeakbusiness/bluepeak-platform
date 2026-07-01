export default function Select({ className = '', children, ...props }) {
  return (
    <select className={`w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 ${className}`} {...props}>
      {children}
    </select>
  );
}
