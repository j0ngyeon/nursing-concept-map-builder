export function createEmptyDiagnosis(priority) {
  return {
    id: crypto.randomUUID(),
    priority,
    diagnosis: '',
    goals: { shortTerm: '', longTerm: '' },
    interventions: [{ id: crypto.randomUUID(), type: 'independent', content: '' }],
    evaluation: '',
  };
}

export function createEmptyMap() {
  const today = new Date().toISOString().slice(0, 10);
  return {
    id: crypto.randomUUID(),
    subject: '성인간호학',
    week: 1,
    facility: '',
    caseTitle: '',
    createdAt: today,
    favorite: false,
    assessment: {
      subjective: [''],
      objective: [''],
    },
    diagnoses: [createEmptyDiagnosis(1)],
  };
}

export const SAMPLE_MAPS = [
  {
    id: crypto.randomUUID(),
    subject: '정신간호학',
    week: 9,
    facility: 'OO정신병원',
    caseTitle: '40대 남성, 조현병 급성기',
    createdAt: '2026-05-12',
    favorite: true,
    assessment: {
      subjective: [
        '"환청이 들려요. 누가 자꾸 나를 욕해요."라고 표현함',
        '"저 사람들이 나를 감시하고 있어요."라며 불안감 호소',
      ],
      objective: [
        '혼잣말하며 허공을 응시하는 모습 관찰됨',
        '병동 내 다른 환자와 눈맞춤 회피, 대화 시 반응 지연',
        'PANSS 양성증상 점수 상승 소견',
      ],
    },
    diagnoses: [
      {
        id: crypto.randomUUID(),
        priority: 1,
        diagnosis: '감각지각장애(청각적) related to 신경생물학적 변화',
        goals: {
          shortTerm: '대상자는 1주일 이내 환청 발생 시 대처 전략을 1가지 이상 말할 수 있다.',
          longTerm: '대상자는 퇴원 시까지 환청으로 인한 일상생활 지장을 스스로 보고하지 않는다.',
        },
        interventions: [
          { id: crypto.randomUUID(), type: 'independent', content: '환청 발생 빈도, 내용, 대상자의 반응을 주기적으로 사정하고 기록한다.' },
          { id: crypto.randomUUID(), type: 'independent', content: '환청 발생 시 현실감을 제공하고, 안전한 환경임을 반복적으로 알린다.' },
          { id: crypto.randomUUID(), type: 'dependent', content: '처방된 항정신병 약물(예: risperidone)을 투약하고 부작용을 관찰한다.' },
        ],
        evaluation: '목표 부분 달성. 대상자는 환청 발생 시 "이어폰으로 음악 듣기"라는 대처 전략을 스스로 말할 수 있었으나, 환청으로 인한 불안은 완전히 소실되지 않아 지속 관찰이 필요함.',
      },
      {
        id: crypto.randomUUID(),
        priority: 2,
        diagnosis: '사회적 고립 related to 의심스러운 사고 및 대인관계 회피',
        goals: {
          shortTerm: '대상자는 3일 이내 병동 프로그램에 1회 이상 자발적으로 참여한다.',
          longTerm: '대상자는 퇴원 시까지 타인과 갈등 없이 상호작용하는 시간이 증가한다.',
        },
        interventions: [
          { id: crypto.randomUUID(), type: 'independent', content: '초기에는 1:1 관계 형성을 시도하고 점진적으로 집단 활동 참여를 격려한다.' },
          { id: crypto.randomUUID(), type: 'independent', content: '대상자의 감정을 판단 없이 수용하는 치료적 의사소통을 적용한다.' },
        ],
        evaluation: '목표 달성. 병동 미술요법 프로그램에 자발적으로 참여하는 모습이 관찰됨.',
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    subject: '성인간호학',
    week: 4,
    facility: 'OO대학병원 신경외과병동',
    caseTitle: '70대 여성, 뇌졸중 후 우측 편마비',
    createdAt: '2026-03-20',
    favorite: false,
    assessment: {
      subjective: [
        '"오른쪽 팔다리에 힘이 하나도 안 들어가."라고 표현함',
        '"혼자 화장실도 못 가서 답답해."라며 좌절감 호소',
      ],
      objective: [
        '우측 상하지 근력 MMT 2/5로 측정됨',
        '보행 시 편측 지지 필요, 낙상 위험도 High risk로 사정됨',
        '식사 시 우측 손 사용 어려워 좌측 손으로 보조하는 모습 관찰됨',
      ],
    },
    diagnoses: [
      {
        id: crypto.randomUUID(),
        priority: 1,
        diagnosis: '신체 기동성 장애 related to 편마비로 인한 근력 저하',
        goals: {
          shortTerm: '대상자는 1주일 이내 보조기구를 이용하여 5m 이상 안전하게 보행할 수 있다.',
          longTerm: '대상자는 퇴원 시까지 낙상 없이 병실 내 이동을 스스로 수행할 수 있다.',
        },
        interventions: [
          { id: crypto.randomUUID(), type: 'independent', content: '보행 전후 활력징후 및 어지러움 유무를 사정한다.' },
          { id: crypto.randomUUID(), type: 'independent', content: '낙상 예방을 위해 침대 난간을 올리고 미끄럼 방지 슬리퍼를 착용하도록 한다.' },
          { id: crypto.randomUUID(), type: 'dependent', content: '물리치료사와 협력하여 처방된 재활운동 프로그램을 시행한다.' },
        ],
        evaluation: '목표 달성. 대상자는 보행보조기를 이용하여 병실 내 8m 보행을 낙상 없이 수행함.',
      },
    ],
  },
];
