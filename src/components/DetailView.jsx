import { useState } from 'react';
import { getSubjectColor, getPriorityColor, INTERVENTION_TYPE_LABELS } from '../lib/constants';
import StarButton from './StarButton';
import ConfirmModal from './ConfirmModal';

function FlowArrow() {
  return (
    <div className="flex justify-center py-1 print:hidden" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-slate-300 dark:stroke-slate-600" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v14m0 0l-5-5m5 5l5-5" />
      </svg>
    </div>
  );
}

function SectionCard({ title, accent, children }) {
  return (
    <div className={`rounded-2xl border bg-white dark:bg-slate-800 p-4 sm:p-5 shadow-sm ${accent}`}>
      <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-2.5">{title}</h3>
      {children}
    </div>
  );
}

export default function DetailView({ map, onEdit, onDelete, onToggleFavorite, onBack }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const colors = getSubjectColor(map.subject);

  const handlePrint = () => window.print();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 print:max-w-none print:px-0">
      <div className="flex items-center justify-between mb-4 print:hidden">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="목록으로"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current"><path fillRule="evenodd" d="M12.7 15.3a1 1 0 01-1.4 0l-5-5a1 1 0 010-1.4l5-5a1 1 0 111.4 1.4L8.42 9.5H16a1 1 0 110 2H8.42l4.3 4.3a1 1 0 010 1.4z" clipRule="evenodd" /></svg>
        </button>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            인쇄 / PDF 내보내기
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-1 rounded-lg bg-slate-100 dark:bg-slate-700 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            수정
          </button>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="inline-flex items-center gap-1 rounded-lg bg-rose-50 dark:bg-rose-900/30 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors"
          >
            삭제
          </button>
        </div>
      </div>

      <header className="mb-6">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${colors.tag}`}>{map.subject}</span>
            <span className="rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 text-xs font-medium">
              {map.week}주차
            </span>
            {map.facility && (
              <span className="rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2.5 py-1 text-xs">
                {map.facility}
              </span>
            )}
          </div>
          <StarButton active={map.favorite} onToggle={onToggleFavorite} className="print:hidden" />
        </div>
        <h1 className="mt-3 text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">{map.caseTitle}</h1>
        <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">작성일 {map.createdAt}</p>
      </header>

      <div className="space-y-0">
        <SectionCard title="1. 사정 (Assessment)" accent="border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">주관적 자료 (S)</p>
              <ul className="space-y-1.5">
                {map.assessment.subjective.filter(Boolean).map((s, i) => (
                  <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex gap-1.5">
                    <span className="text-slate-300 dark:text-slate-600">·</span>{s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">객관적 자료 (O)</p>
              <ul className="space-y-1.5">
                {map.assessment.objective.filter(Boolean).map((o, i) => (
                  <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex gap-1.5">
                    <span className="text-slate-300 dark:text-slate-600">·</span>{o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionCard>

        {map.diagnoses.map((d) => (
          <div key={d.id} className="print:break-inside-avoid">
            <FlowArrow />

            <SectionCard title="2. 간호진단 (Nursing Diagnosis)" accent="border-slate-200 dark:border-slate-700">
              <div className="flex items-start gap-2.5">
                <span className={`shrink-0 h-6 w-6 flex items-center justify-center rounded-full text-xs font-bold ${getPriorityColor(d.priority)}`}>
                  {d.priority}
                </span>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed">{d.diagnosis}</p>
              </div>
            </SectionCard>

            <FlowArrow />

            <SectionCard title="3. 목표 / 계획 (Goal / Planning)" accent="border-slate-200 dark:border-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">단기목표</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{d.goals.shortTerm}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">장기목표</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{d.goals.longTerm}</p>
                </div>
              </div>
            </SectionCard>

            <FlowArrow />

            <SectionCard title="4. 중재 (Intervention)" accent="border-slate-200 dark:border-slate-700">
              <ul className="space-y-2">
                {d.interventions.filter((iv) => iv.content).map((iv) => (
                  <li key={iv.id} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <span
                      className={`shrink-0 mt-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        iv.type === 'independent'
                          ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300'
                          : 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300'
                      }`}
                    >
                      {INTERVENTION_TYPE_LABELS[iv.type]}
                    </span>
                    <span className="leading-relaxed">{iv.content}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <FlowArrow />

            <SectionCard title="5. 평가 (Evaluation)" accent="border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{d.evaluation}</p>
            </SectionCard>
          </div>
        ))}
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="이 컨셉맵을 삭제할까요?"
        description={`"${map.caseTitle}" 컨셉맵이 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없어요.`}
        confirmLabel="삭제"
        danger
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          onDelete();
        }}
      />
    </div>
  );
}
