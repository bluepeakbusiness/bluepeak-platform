export default function Textarea({ className = '', ...props }) {
  return <textarea className={`min-h-24 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 ${className}`} {...props} />;
}
