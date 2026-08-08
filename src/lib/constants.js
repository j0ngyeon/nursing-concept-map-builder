export const SUBJECTS = [
  '성인간호학',
  '정신간호학',
  '아동간호학',
  '지역사회간호학',
  '모성간호학',
  '기타',
];

export const SUBJECT_COLORS = {
  성인간호학: {
    tag: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    dot: 'bg-blue-500',
    ring: 'ring-blue-200 dark:ring-blue-800',
  },
  정신간호학: {
    tag: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    dot: 'bg-purple-500',
    ring: 'ring-purple-200 dark:ring-purple-800',
  },
  아동간호학: {
    tag: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    dot: 'bg-amber-500',
    ring: 'ring-amber-200 dark:ring-amber-800',
  },
  지역사회간호학: {
    tag: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
    dot: 'bg-teal-500',
    ring: 'ring-teal-200 dark:ring-teal-800',
  },
  모성간호학: {
    tag: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    dot: 'bg-rose-500',
    ring: 'ring-rose-200 dark:ring-rose-800',
  },
  기타: {
    tag: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    dot: 'bg-slate-500',
    ring: 'ring-slate-200 dark:ring-slate-700',
  },
};

export function getSubjectColor(subject) {
  return SUBJECT_COLORS[subject] || SUBJECT_COLORS['기타'];
}

export const PRIORITY_COLORS = [
  'bg-rose-500 text-white',
  'bg-amber-500 text-white',
  'bg-sky-500 text-white',
  'bg-emerald-500 text-white',
  'bg-slate-500 text-white',
];

export function getPriorityColor(priority) {
  return PRIORITY_COLORS[(priority - 1) % PRIORITY_COLORS.length];
}

export const INTERVENTION_TYPE_LABELS = {
  independent: '독립적 중재',
  dependent: '의존적 중재',
};

export const STORAGE_KEY = 'nursing-concept-maps';
export const THEME_KEY = 'nursing-concept-maps-theme';
