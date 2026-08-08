import { useState } from 'react';
import { SUBJECTS, INTERVENTION_TYPE_LABELS, getPriorityColor } from '../lib/constants';
import { createEmptyDiagnosis } from '../data/sampleData';

function TextListEditor({ label, items, onChange, placeholder }) {
  const update = (idx, value) => {
    const next = [...items];
    next[idx] = value;
    onChange(next);
  };
  const add = () => onChange([...items, '']);
  const remove = (idx) => {
    if (items.length === 1) {
      onChange(['']);
      return;
    }
    onChange(items.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">{label}</label>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <textarea
              rows={1}
              value={item}
              onChange={(e) => update(idx, e.target.value)}
              placeholder={placeholder}
              className="flex-1 resize-y rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700"
            />
            <button
              type="button"
              onClick={() => remove(idx)}
              aria-label="항목 삭제"
              className="shrink-0 mt-1 rounded-md p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current"><path d="M6 8a1 1 0 011 1v6a1 1 0 11-2 0V9a1 1 0 011-1zm4 0a1 1 0 011 1v6a1 1 0 11-2 0V9a1 1 0 011-1zm5-3a1 1 0 00-1-1H6a1 1 0 00-1 1v1H3a1 1 0 100 2h.06l.7 9.14A2 2 0 005.75 18h8.5a2 2 0 001.99-1.86L17 7h.06a1 1 0 100-2H15V5a1 1 0 00-1 1v0z" /></svg>
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 inline-flex items-center gap-1"
      >
        + 항목 추가
      </button>
    </div>
  );
}

function DiagnosisCard({ diagnosis, index, total, onChange, onRemove, onMove }) {
  const update = (patch) => onChange({ ...diagnosis, ...patch });
  const updateGoals = (patch) => onChange({ ...diagnosis, goals: { ...diagnosis.goals, ...patch } });

  const updateIntervention = (id, patch) => {
    update({
      interventions: diagnosis.interventions.map((iv) => (iv.id === id ? { ...iv, ...patch } : iv)),
    });
  };
  const addIntervention = () => {
    update({
      interventions: [
        ...diagnosis.interventions,
        { id: crypto.randomUUID(), type: 'independent', content: '' },
      ],
    });
  };
  const removeIntervention = (id) => {
    if (diagnosis.interventions.length === 1) return;
    update({ interventions: diagnosis.interventions.filter((iv) => iv.id !== id) });
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className={`h-7 w-7 flex items-center justify-center rounded-full text-xs font-bold ${getPriorityColor(diagnosis.priority)}`}>
            {diagnosis.priority}
          </span>
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">간호진단 세트 #{diagnosis.priority}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => onMove(-1)}
            aria-label="우선순위 위로"
            className="rounded-md p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current"><path d="M10 5l6 6H4l6-6z" /></svg>
          </button>
          <button
            type="button"
            disabled={index === total - 1}
            onClick={() => onMove(1)}
            aria-label="우선순위 아래로"
            className="rounded-md p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current"><path d="M10 15l-6-6h12l-6 6z" /></svg>
          </button>
          <button
            type="button"
            onClick={onRemove}
            disabled={total === 1}
            aria-label="진단 삭제"
            className="rounded-md p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current"><path d="M6 8a1 1 0 011 1v6a1 1 0 11-2 0V9a1 1 0 011-1zm4 0a1 1 0 011 1v6a1 1 0 11-2 0V9a1 1 0 011-1zm5-3a1 1 0 00-1-1H6a1 1 0 00-1 1v1H3a1 1 0 100 2h.06l.7 9.14A2 2 0 005.75 18h8.5a2 2 0 001.99-1.86L17 7h.06a1 1 0 100-2H15V5a1 1 0 00-1 1v0z" /></svg>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
            간호진단 (NANDA 형식: ~와 관련된 ~)
          </label>
          <input
            type="text"
            value={diagnosis.diagnosis}
            onChange={(e) => update({ diagnosis: e.target.value })}
            placeholder="예: 신체 기동성 장애 related to 편마비로 인한 근력 저하"
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">단기목표</label>
            <textarea
              rows={2}
              value={diagnosis.goals.shortTerm}
              onChange={(e) => updateGoals({ shortTerm: e.target.value })}
              className="w-full resize-y rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">장기목표</label>
            <textarea
              rows={2}
              value={diagnosis.goals.longTerm}
              onChange={(e) => updateGoals({ longTerm: e.target.value })}
              className="w-full resize-y rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">중재 (Intervention)</label>
          <div className="space-y-2">
            {diagnosis.interventions.map((iv) => (
              <div key={iv.id} className="flex items-start gap-2">
                <select
                  value={iv.type}
                  onChange={(e) => updateIntervention(iv.id, { type: e.target.value })}
                  className="shrink-0 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-2 text-xs text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700"
                >
                  {Object.entries(INTERVENTION_TYPE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
                <textarea
                  rows={1}
                  value={iv.content}
                  onChange={(e) => updateIntervention(iv.id, { content: e.target.value })}
                  placeholder="중재 내용을 입력하세요"
                  className="flex-1 resize-y rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700"
                />
                <button
                  type="button"
                  onClick={() => removeIntervention(iv.id)}
                  disabled={diagnosis.interventions.length === 1}
                  aria-label="중재 삭제"
                  className="shrink-0 mt-1 rounded-md p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current"><path d="M6 8a1 1 0 011 1v6a1 1 0 11-2 0V9a1 1 0 011-1zm4 0a1 1 0 011 1v6a1 1 0 11-2 0V9a1 1 0 011-1zm5-3a1 1 0 00-1-1H6a1 1 0 00-1 1v1H3a1 1 0 100 2h.06l.7 9.14A2 2 0 005.75 18h8.5a2 2 0 001.99-1.86L17 7h.06a1 1 0 100-2H15V5a1 1 0 00-1 1v0z" /></svg>
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addIntervention}
            className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 inline-flex items-center gap-1"
          >
            + 중재 추가
          </button>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">평가 (목표 달성 여부 및 근거)</label>
          <textarea
            rows={2}
            value={diagnosis.evaluation}
            onChange={(e) => update({ evaluation: e.target.value })}
            placeholder="예: 목표 달성. 대상자는 보행보조기를 이용하여 병실 내 8m 보행을 낙상 없이 수행함."
            className="w-full resize-y rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700"
          />
        </div>
      </div>
    </div>
  );
}

export default function EditView({ initialMap, isNew, onSave, onCancel }) {
  const [form, setForm] = useState(initialMap);
  const [error, setError] = useState('');

  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const updateDiagnoses = (diagnoses) => {
    const renumbered = diagnoses.map((d, i) => ({ ...d, priority: i + 1 }));
    setForm((prev) => ({ ...prev, diagnoses: renumbered }));
  };

  const addDiagnosis = () => {
    updateDiagnoses([...form.diagnoses, createEmptyDiagnosis(form.diagnoses.length + 1)]);
  };

  const removeDiagnosis = (id) => {
    if (form.diagnoses.length === 1) return;
    updateDiagnoses(form.diagnoses.filter((d) => d.id !== id));
  };

  const moveDiagnosis = (index, delta) => {
    const target = index + delta;
    if (target < 0 || target >= form.diagnoses.length) return;
    const next = [...form.diagnoses];
    [next[index], next[target]] = [next[target], next[index]];
    updateDiagnoses(next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.caseTitle.trim()) {
      setError('케이스 제목/환자 특성 요약을 입력해주세요.');
      return;
    }
    setError('');
    onSave(form);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-28">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            onClick={onCancel}
            aria-label="뒤로가기"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current"><path fillRule="evenodd" d="M12.7 15.3a1 1 0 01-1.4 0l-5-5a1 1 0 010-1.4l5-5a1 1 0 111.4 1.4L8.42 9.5H16a1 1 0 110 2H8.42l4.3 4.3a1 1 0 010 1.4z" clipRule="evenodd" /></svg>
          </button>
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            {isNew ? '새 컨셉맵 만들기' : '컨셉맵 수정'}
          </h1>
        </div>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 sm:p-5 mb-5">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4 tracking-wide">기본 정보</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">과목</label>
              <select
                value={form.subject}
                onChange={(e) => updateField('subject', e.target.value)}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700"
              >
                {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">주차</label>
              <input
                type="number"
                min={1}
                value={form.week}
                onChange={(e) => updateField('week', Number(e.target.value))}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                케이스 제목 / 환자 특성 요약 (익명화)
              </label>
              <input
                type="text"
                value={form.caseTitle}
                onChange={(e) => updateField('caseTitle', e.target.value)}
                placeholder="예: 70대 여성, 뇌졸중 후 편마비"
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">실습 기관명 (선택)</label>
              <input
                type="text"
                value={form.facility}
                onChange={(e) => updateField('facility', e.target.value)}
                placeholder="예: OO대학병원 신경외과병동"
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">작성일</label>
              <input
                type="date"
                value={form.createdAt}
                onChange={(e) => updateField('createdAt', e.target.value)}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-700"
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 sm:p-5 mb-5">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4 tracking-wide">1. 사정 (Assessment)</h2>
          <div className="space-y-5">
            <TextListEditor
              label="주관적 자료 (Subjective Data)"
              items={form.assessment.subjective}
              onChange={(items) => updateField('assessment', { ...form.assessment, subjective: items })}
              placeholder='예: "오른쪽 팔다리에 힘이 하나도 안 들어가."라고 표현함'
            />
            <TextListEditor
              label="객관적 자료 (Objective Data)"
              items={form.assessment.objective}
              onChange={(items) => updateField('assessment', { ...form.assessment, objective: items })}
              placeholder="예: 우측 상하지 근력 MMT 2/5로 측정됨"
            />
          </div>
        </section>

        <section className="mb-5">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 tracking-wide">
              2~5. 간호진단 · 계획 · 중재 · 평가 세트
            </h2>
          </div>
          <div className="space-y-4">
            {form.diagnoses.map((d, idx) => (
              <DiagnosisCard
                key={d.id}
                diagnosis={d}
                index={idx}
                total={form.diagnoses.length}
                onChange={(next) => updateDiagnoses(form.diagnoses.map((x) => (x.id === d.id ? next : x)))}
                onRemove={() => removeDiagnosis(d.id)}
                onMove={(delta) => moveDiagnosis(idx, delta)}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={addDiagnosis}
            className="mt-4 w-full rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 py-3 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:border-emerald-400 hover:text-emerald-600 dark:hover:border-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            + 간호진단 세트 추가
          </button>
        </section>

        {error && (
          <p className="mb-4 text-sm text-rose-600 dark:text-rose-400 font-medium">{error}</p>
        )}

        <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-4 py-3 sm:px-6">
          <div className="max-w-3xl mx-auto flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-colors"
            >
              저장하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
