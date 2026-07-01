export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="rounded-lg border border-slate-300 bg-white px-3 py-2">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none"
      />
    </div>
  );
}
