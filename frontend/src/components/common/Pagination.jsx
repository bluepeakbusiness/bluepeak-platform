export default function Pagination({ page, pages, onPageChange }) {
  return (
    <div className="mt-4 flex items-center justify-between">
      <button type="button" onClick={() => onPageChange(Math.max(1, page - 1))} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
        Previous
      </button>
      <span className="text-sm text-slate-600">Page {page} of {pages}</span>
      <button type="button" onClick={() => onPageChange(Math.min(pages, page + 1))} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
        Next
      </button>
    </div>
  );
}
