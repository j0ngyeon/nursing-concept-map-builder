export default function StarButton({ active, onToggle, className = '' }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-label={active ? '즐겨찾기 해제' : '즐겨찾기 추가'}
      aria-pressed={active}
      className={`shrink-0 rounded-full p-1.5 transition-colors hover:bg-amber-100 dark:hover:bg-amber-900/30 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-5 w-5 ${active ? 'fill-amber-400 stroke-amber-400' : 'fill-none stroke-slate-400 dark:stroke-slate-500'}`}
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L12 16.9l-5.2 2.61.99-5.79-4.21-4.1 5.82-.85L12 3.5z"
        />
      </svg>
    </button>
  );
}
