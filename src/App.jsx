import { useEffect, useState } from 'react';
import { useConceptMaps } from './hooks/useConceptMaps';
import { createEmptyMap } from './data/sampleData';
import { THEME_KEY } from './lib/constants';
import ListView from './components/ListView';
import EditView from './components/EditView';
import DetailView from './components/DetailView';

function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored === 'dark';
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
  }, [dark]);

  return [dark, setDark];
}

export default function App() {
  const { maps, saveMap, deleteMap, toggleFavorite } = useConceptMaps();
  const [dark, setDark] = useDarkMode();

  const [view, setView] = useState('list');
  const [selectedId, setSelectedId] = useState(null);
  const [draftMap, setDraftMap] = useState(null);
  const [isNewDraft, setIsNewDraft] = useState(false);

  const openDetail = (id) => {
    setSelectedId(id);
    setView('detail');
  };

  const openCreate = () => {
    setDraftMap(createEmptyMap());
    setIsNewDraft(true);
    setView('edit');
  };

  const openEdit = (map) => {
    setDraftMap(structuredClone(map));
    setIsNewDraft(false);
    setView('edit');
  };

  const handleSave = (form) => {
    saveMap(form);
    setSelectedId(form.id);
    setDraftMap(null);
    setView('detail');
  };

  const handleCancelEdit = () => {
    setDraftMap(null);
    setView(isNewDraft ? 'list' : 'detail');
  };

  const handleDelete = () => {
    deleteMap(selectedId);
    setSelectedId(null);
    setView('list');
  };

  const selectedMap = maps.find((m) => m.id === selectedId) || null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <nav className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setView('list')}
            className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-100"
          >
            <span className="h-7 w-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-sm">🌿</span>
            <span className="text-sm sm:text-base">간호 컨셉맵 빌더</span>
          </button>
          <button
            type="button"
            onClick={() => setDark((v) => !v)}
            aria-label="다크모드 전환"
            className="rounded-lg p-2 text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {dark ? (
              <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.24 2.05a1 1 0 011.41 0l.71.71a1 1 0 11-1.41 1.41l-.71-.71a1 1 0 010-1.41zM18 9a1 1 0 110 2h-1a1 1 0 110-2h1zM4.05 4.05a1 1 0 011.41 1.41l-.71.71A1 1 0 013.34 4.76l.71-.71zM10 5.5A4.5 4.5 0 1010 14.5 4.5 4.5 0 0010 5.5zM3 9a1 1 0 110 2H2a1 1 0 110-2h1zm1.34 5.24a1 1 0 011.41 1.41l-.71.71a1 1 0 01-1.41-1.41l.71-.71zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm4.24-.05a1 1 0 011.41 0l.71.71a1 1 0 01-1.41 1.41l-.71-.71a1 1 0 010-1.41z" /></svg>
            ) : (
              <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
            )}
          </button>
        </div>
      </nav>

      {view === 'list' && (
        <ListView
          maps={maps}
          onOpenDetail={openDetail}
          onCreateNew={openCreate}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {view === 'edit' && draftMap && (
        <EditView
          initialMap={draftMap}
          isNew={isNewDraft}
          onSave={handleSave}
          onCancel={handleCancelEdit}
        />
      )}

      {view === 'detail' && selectedMap && (
        <DetailView
          map={selectedMap}
          onEdit={() => openEdit(selectedMap)}
          onDelete={handleDelete}
          onToggleFavorite={() => toggleFavorite(selectedMap.id)}
          onBack={() => setView('list')}
        />
      )}

      {view === 'detail' && !selectedMap && (
        <div className="max-w-3xl mx-auto px-6 py-16 text-center text-slate-400">
          컨셉맵을 찾을 수 없어요.
        </div>
      )}
    </div>
  );
}
