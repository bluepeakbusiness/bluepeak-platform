export default function PageContainer({ children, className = '' }) {
  return <div className={`rounded-2xl bg-white p-6 shadow-sm ${className}`}>{children}</div>;
}
