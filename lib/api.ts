import { LineChart, Users, Calendar, Brain } from 'lucide-react';

const UserType = [
  {
    id: 1,
    name: 'Familia',
  },
  {
    id: 2,
    name: 'Profissional'
  }
];

const KeyStats = [
  {
    id: 1,
    UserType: UserType[1],
    name: 'Crianças Ativas', // Static title
    value: '3',
    icon: Users, // Static icon
    description: 'Crianças em acompanhamento', // Static description
  },
  {
    id: 2,
    type: UserType[1],
    name: 'Proximas Atividades', // Static title
    value: 'Hoje',
    icon: Calendar, // Static icon
    description: '14:30 - Terapia com a fonoaudióloga',
  },
  {
    id: 3,
    type: UserType[1],
    name: 'Metas', // Static title
    value: '8/12',
    icon: Brain, // Static icon
    description: 'Metas semestrais de desenvolvimento', // Static description
  },
  {
    id: 4,
    type: UserType[1],
    name: 'Atualizações Recentes', // Static title
    value: '24',
    icon: LineChart, // Static icon
    description: 'Últimos 7 dias', // Static description                                    
  },
];

const FamilyMetadata = [
  {
    id: 1,
    name: 'Lucas Lucena',
    gender: 'Masculino',
    birthDate: '1990-01-15',
    age: 32,
    relation: 'Pai',
    occupation: 'Engenheiro de Software',
    cpf: '123.456.789-00',
    phone: '(86) 9 9490-0827',
    email: 'lucas.lucena@email.com',
    address: 'Rua Visconde de Pirajá, 595',
    workplace: 'InovaICEV LTD.',
    workAddress: 'Av. Raul Lopes, 1000'
  },
  {
    id: 2,
    name: 'Cecília Lucena',
    gender: 'Feminino',
    birthDate: '2016-08-15',
    age: 7,
    relation: '',
    occupation: '',
    cpf: '123.111.222-33',
    phone: '',
    email: '',
    address: 'Rua Visconde de Pirajá, 595',
    workplace: '',
    workAddress: ''
  },
  {
    id: 3,
    name: 'João Lucena',
    gender: 'Masculino',
    birthDate: '1992-03-20',
    age: 30,
    relation: 'Tio',
    occupation: 'Professor',
    cpf: '123.222.333-44',
    phone: '(89) 9 8987-6543',
    email: 'joao.lucena@email.com',
    address: 'Rua Teresinha Nunes, 123',
    workplace: 'Colégio Estadual Nossa Senhora de Fátima',
    workAddress: 'Av. Nossa Senhora de Fátima, 123'
  },
  {
    id: 4,
    name: 'Samuel Lucena',
    gender: 'Masculino',
    birthDate: '2018-03-20',
    age: 5,
    relation: 'Irmão',
    occupation: '',
    cpf: '123.333.444-55',
    phone: '',
    email: '',
    address: 'Rua Visconde de Pirajá, 595',
    workplace: '',
    workAddress: ''
  }
];

const MedicalMetadata = [
  {
    id: 1,
    diagnosis: 'TEA',
    bloodType: 'A+',
    allergies: ['Noses', 'Camarão'],
    medications: ['Ritalina 10mg', 'Melatonina 3mg'],
  }
];

const ProfessionalMetadata = [
  {
    id: 1,
    name: 'Maria Eduarda Freitas',
    cpf: '123.456.888-00',
    prefix: 'Dr(a).',
    role: 'profissional',
    specialization: 'Fonoaudiologia',
    phone: '(86) 9 9999-9999',
    address: 'Rua da Draga, 123',
    workplace: 'Clínica Infantil Aconchego',
    workAddress: 'Av. Raul Lopes, 1000',
    Register: 'CRFa 12345'
  },
  {
    id: 2,
    name: 'Sarah Medeiros',
    cpf: '123.456.888-00',
    prefix: 'Dr(a).',
    role: 'profissional',
    specialization: 'Psicologia Infantil',
    phone: '(86) 9 9999-9999',
    address: 'Rua Dr. José de Moura, 123',
    workplace: 'Colegio CEV',
    workAddress: 'Av. Raul Lopes, 1000',
    Register: 'CRP 12345'
  }
];

const Categories = [
  {
    id: 1,
    name: 'Comunicação',
  },
  {
    id: 2,
    name: 'Habilidades Motoras',
  },
  {
    id: 3,
    name: 'Social',
  },
  {
    id: 4,
    name: 'Comportamental',
  },
  {
    id: 5,
    name: 'Linguagem',
  }
];

const MilesStones = [
  {
    id: 1,
    category: [Categories[0]],
    name: 'Primeiras Palavras',
  },
  {
    id: 2,
    category: [Categories[1]],
    name: 'Andar sem apoio',
  },
  {
    id: 3,
    category: [Categories[2]],
    name: 'Compartilhar brinquedos',
  },
  {
    id: 4,
    category: [Categories[3]],
    name: 'Seguir regras simples',
  },
  {
    id: 5,
    category: [Categories[4]],
    name: 'Combinar palavras',
  }
];

const childrenMilestones = [
  {
    id: 1,
    milestone: MilesStones[0],
    date: '2024-01-15',
    notes: 'Iniciou o uso de palavras simples de forma consistente',
    status: 'arquivado'
  },
  {
    id: 2,
    milestone: MilesStones[1],
    date: '2023-12-20',
    notes: 'Andar confiante sem apoio por curtos períodos',
    status: 'arquivado'
  }
];

const childrenTherapySessions = [
  {
    id: 1,
    type: 'Terapia Ocupacional',
    date: '2024-02-15',
    notes: 'Trabalhou habilidades motoras finas com foco em coordenação mão-olho',
    therapist: ProfessionalMetadata[1],
  }
];

const childrenNotesReplies = [
  {
    id: 1,
    authorType: UserType[1],
    author: ProfessionalMetadata[1],
    content: 'Isso é ótimo! Continue incentivando em casa.',
    date: '2024-02-11',
  },
  {
    id: 2,
    authorType: UserType[0],
    author: FamilyMetadata[0],
    content: 'Vamos continuar incentivando e comemorando cada conquista!',
    date: '2024-02-12',
  },
  {
    id: 3,
    authorType: UserType[1],
    author: ProfessionalMetadata[1],
    content: 'Parabéns! Continue incentivando e comemorando cada conquista!',
    date: '2024-02-12',
  }
];

const childrenNotes = [
  {
    id: 1,
    isPrivate: false,
    authorType: UserType[1],
    author: ProfessionalMetadata[1],
    name: 'Avanço na Comunicação',
    content: 'Iniciou a combinação de duas palavras em frases simples',
    categories: [Categories[0], Categories[4]],
    date: '2024-02-10',
    replies: [childrenNotesReplies[0], childrenNotesReplies[1]]
  },
  {
    id: 2,
    isPrivate: true,
    authorType: UserType[1],
    author: ProfessionalMetadata[1],
    name: 'Progresso na Interação Social',
    content: 'Mostrou interesse em brincar com outras crianças na escola',
    categories: [Categories[2], Categories[3]],
    date: '2024-02-08',
    replies: [childrenNotesReplies[2]]
  }
];

const childrenArchivedMetadata = [
  {
    id: 1,
    archived: true,
    reason: 'Mudança de cidade',
    notes: 'Família mudou-se para São Paulo'
  },
];


const children = [
  {
    id: 1,
    archivedMetadata: null,
    metadata: FamilyMetadata[1],
    medicalMetadata: MedicalMetadata[0],
    emergencyContact: FamilyMetadata[0],
    family: {
      parents: [
        FamilyMetadata[0],
        FamilyMetadata[2]
      ],
      siblings: [
        FamilyMetadata[3]
      ]
    },
    profileImage: '',
    milestones: [
      childrenMilestones[0],
      childrenMilestones[1]
    ],
    therapySessions: [
      childrenTherapySessions[0]
    ],
    notes: [
      childrenNotes[0],
      childrenNotes[1]
    ]
  }
]

export const mockUserData = [
  {
    id: 1,
    active: true,
    userType: UserType[0],
    email: 'lucas.lucena@email.com',
    password: '12345678',
    metadata: FamilyMetadata[0],
    children: children[0]
  },
  {
    id: 2,
    active: true,
    userType: UserType[1],
    email: 'sara.medeiros@abare.tech',
    password: '11111111',
    metadata: ProfessionalMetadata[1],
    patients: children
  }
];

// API Functions
export async function getAllChildIds() {
  // In a real app, this would fetch from an API
  return [1, 2, 3]; // Static list of IDs for build time
}

export async function getUserProfile(role: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (role === 'Familia') {
    // return the users from mockUserData that have userType.name === 'Familia'
    return mockUserData.find(user => user.userType.name === 'Familia');
  }
  if (role === 'Profissional') {
    // return the users from mockUserData that have userType.name === 'profissional'
    return mockUserData.find(user => user.userType.name === 'Profissional');
  }
}

export async function getMilestones(childId: number) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  return children.find(child => child.id === childId).milestones || [];
}

export async function addChild(childData: any) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, data: childData };
}

export async function archiveChild(childId: number, reason: string, notes?: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true };
}

export async function getKeyStats(userTypeId: number, userId: number) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return KeyStats.filter(stat => stat.type.id === userTypeId);