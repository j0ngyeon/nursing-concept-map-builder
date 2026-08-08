import { useMemo, useState } from 'react';
import { SUBJECTS, getSubjectColor } from '../lib/constants';
import StarButton from './StarButton';

const SORT_OPTIONS = [
  { value: 'createdAt-desc', label: '작성일 최신순' },
  { value: 'createdAt-asc', label: '작성일 오래된순' },
  { value: 'week-asc', label: '주차 빠른순' },
  { value: 'week-desc', label: '주차 늦은순' },
];

export default function ListView({ maps, onOpenDetail, onCreateNew, onToggleFavorite }) {
  const [subjectFilter, setSubjectFilter] = useState('전체');
  const [weekFilter, setWeekFilter] = useState('');
  const [keyword, setKeyword] = useState('');
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [sort, setSort] = useState('createdAt-desc');

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    let result = maps.filter((m) => {
      if (subjectFilter !== '전체' && m.subject !== subjectFilter) return false;
      if (weekFilter !== '' && String(m.week) !== weekFilter) return false;
      if (favoriteOnly && !m.favorite) return false;
      if (kw) {
        const inTitle = m.caseTitle.toLowerCase().includes(kw);
        const inDiagnosis = m.diagnoses.some((d) => d.diagnosis.toLowerCase().includes(kw));
        if (!inTitle && !inDiagnosis) return false;
      }
      return true;
    });

    const [field, dir] = sort.split('-');
    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (field === 'createdAt') cmp = a.createdAt.localeCompare(b.createdAt);
      if (field === 'week') cmp = a.week - b.week;
      return dir === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [maps, subjectFilter, weekFilter, keyword, favoriteOnly, sort]);

  const weeks = useMemo(
    () => Array.from(new Set(maps.map((m) => m.week))).sort((a, b) => a - b),
    [maps]
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">내 컨셉맵</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              총 {maps.length}개의 컨셉맵이 저장되어 있어요.
            </p>
          </div>
          <button
            type="button"
            onClick={onCreateNew}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-white"><path d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" /></svg>
            새 컨셉맵 만들기
          </button>
        </div>

        <div className="relative">
          <svg viewBox="0 0 20 20" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 fill-slate-400">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.45 4.39l3.58 3.58a.75.75 0 11-1.06 1.06l-3.58-3.58A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
          <input
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="케이스 제목, 간호진단명으로 검색"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 pl-9 pr-3 text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {['전체', ...SUBJECTS].map((s) => {
            const active = subjectFilter === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setSubjectFilter(s)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors border ${
                  active
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={weekFilter}
            onChange={(e) => setWeekFilter(e.target.value)}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          >
            <option value="">전체 주차</option>
            {weeks.map((w) => (
              <option key={w} value={w}>{w}주차</option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs px-2.5 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setFavoriteOnly((v) => !v)}
            className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-2 text-xs font-medium transition-colors ${
              favoriteOnly
                ? 'border-amber-300 bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-300'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            ★ 즐겨찾기만
          </button>
        </div>
      </div>

      <div className="mt-6">
        {filtered.length === 0 ? (
          <EmptyState hasAnyMaps={maps.length > 0} onCreateNew={onCreateNew} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((m) => (
              <MapCard key={m.id} map={m} onOpen={() => onOpenDetail(m.id)} onToggleFavorite={() => onToggleFavorite(m.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MapCard({ map, onOpen, onToggleFavorite }) {
  const colors = getSubjectColor(map.subject);
  const topDiagnoses = map.diagnoses.slice(0, 2);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
      className="text-left rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${colors.tag}`}>{map.subject}</span>
          <span className="rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 text-xs font-medium">
            {map.week}주차
          </span>
        </div>
        <StarButton active={map.favorite} onToggle={onToggleFavorite} />
      </div>

      <h3 className="mt-3 font-semibold text-slate-800 dark:text-slate-100 leading-snug line-clamp-2">
        {map.caseTitle || '(제목 없음)'}
      </h3>

      {map.facility && (
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{map.facility}</p>
      )}

      {topDiagnoses.length > 0 && (
        <ul className="mt-3 space-y-1">
          {topDiagnoses.map((d) => (
            <li key={d.id} className="text-xs text-slate-500 dark:text-slate-400 truncate">
              #{d.priority} {d.diagnosis || '(간호진단 미입력)'}
            </li>
          ))}
          {map.diagnoses.length > topDiagnoses.length && (
            <li className="text-xs text-slate-400 dark:text-slate-500">
              외 {map.diagnoses.length - topDiagnoses.length}개 진단
            </li>
          )}
        </ul>
      )}

      <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{map.createdAt}</p>
    </div>
  );
}

function EmptyState({ hasAnyMaps, onCreateNew }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 py-16 px-6 text-center">
      <div className="h-14 w-14 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-emerald-500" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6M9 8h1M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z" />
        </svg>
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-700 dark:text-slate-200">
        {hasAnyMaps ? '조건에 맞는 컨셉맵이 없어요' : '아직 저장된 컨셉맵이 없어요'}
      </h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {hasAnyMaps
          ? '필터나 검색어를 바꿔서 다시 확인해보세요.'
          : '실습 케이스로 첫 번째 컨셉맵을 만들어보세요.'}
      </p>
      <button
        type="button"
        onClick={onCreateNew}
        className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
      >
        새 컨셉맵 만들기
      </button>
    </div>
  );
}
