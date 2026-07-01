export default function Toast({ message, type = 'info' }) {
  const tone = type === 'error' ? 'bg-red-600 text-white' : type === 'success' ? 'bg-green-600 text-white' : 'bg-slate-800 text-white';

  return (
    <div className={`rounded-lg px-4 py-3 text-sm shadow-lg ${tone}`}>
      {message}
    </div>
  );
}
