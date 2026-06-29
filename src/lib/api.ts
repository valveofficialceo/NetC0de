import { Match, ModelStats, Player } from '../types';

const generatePlayer = (
  id: string,
  name: string,
  nameRu: string,
  rank: number,
  country: string,
  formStr: string
): Player => ({
  id,
  name,
  nameRu,
  rank,
  country,
  form: formStr.split('') as ('W' | 'L')[],
  surfaceStats: {
    hard: 0.6 + Math.random() * 0.3,
    clay: 0.6 + Math.random() * 0.3,
    grass: 0.6 + Math.random() * 0.3,
  }
});

export const MOCK_MATCHES: Match[] = [
  {
    id: 'm1',
    tournament: 'ATP Masters 1000 Shanghai',
    tournamentRu: 'ATP Мастерс 1000 Шанхай',
    category: 'ATP 1000',
    surface: 'Hard',
    date: new Date().toISOString(),
    status: 'LIVE',
    player1: generatePlayer('p1', 'Daniil Medvedev', 'Даниил Медведев', 4, 'RUS', 'WWWLW'),
    player2: generatePlayer('p2', 'Jannik Sinner', 'Янник Синнер', 1, 'ITA', 'WWWWW'),
    score: {
      sets1: [6, 4],
      sets2: [4, 6],
      currentSet: 3,
      currentGame: '40-30'
    },
    bookmakers: [
      { bookmaker: 'PARI', odds1: 2.15, odds2: 1.72, margin: 4.6, isBestValue: true },
      { bookmaker: 'FONBET', odds1: 2.08, odds2: 1.75, margin: 5.2 },
      { bookmaker: 'BETBOOM', odds1: 2.10, odds2: 1.73, margin: 5.4 },
      { bookmaker: 'WINLINE', odds1: 2.05, odds2: 1.76, margin: 5.6 },
    ],
    prediction: {
      winnerId: 'p1',
      probability: 0.54,
      confidence: 'MEDIUM',
      expectedValue: 1.16,
      suggestedOdds: 1.85,
      bestBookmaker: 'PARI',
      bestOdds: 2.15,
      modelFactors: { headToHead: 0.55, recentForm: 0.85, surfaceProficiency: 0.92, fatigueIndex: 0.78 }
    }
  },
  {
    id: 'm2',
    tournament: 'ATP Masters 1000 Paris',
    tournamentRu: 'ATP Мастерс 1000 Париж (Зал)',
    category: 'ATP 1000',
    surface: 'Hard',
    date: new Date().toISOString(),
    status: 'LIVE',
    player1: generatePlayer('p3', 'Andrey Rublev', 'Андрей Рублев', 6, 'RUS', 'WLWWW'),
    player2: generatePlayer('p4', 'Karen Khachanov', 'Карен Хачанов', 18, 'RUS', 'WWLWW'),
    score: {
      sets1: [7],
      sets2: [5],
      currentSet: 2,
      currentGame: '15-15'
    },
    bookmakers: [
      { bookmaker: 'PARI', odds1: 1.45, odds2: 2.75, margin: 5.3 },
      { bookmaker: 'FONBET', odds1: 1.48, odds2: 2.85, margin: 4.8, isBestValue: true },
      { bookmaker: 'BETBOOM', odds1: 1.46, odds2: 2.80, margin: 5.1 },
      { bookmaker: 'WINLINE', odds1: 1.44, odds2: 2.78, margin: 5.4 },
    ],
    prediction: {
      winnerId: 'p3',
      probability: 0.71,
      confidence: 'HIGH',
      expectedValue: 1.05,
      suggestedOdds: 1.41,
      bestBookmaker: 'FONBET',
      bestOdds: 1.48,
      modelFactors: { headToHead: 0.65, recentForm: 0.8, surfaceProficiency: 0.88, fatigueIndex: 0.82 }
    }
  },
  {
    id: 'm3',
    tournament: 'WTA 1000 Beijing',
    tournamentRu: 'WTA 1000 Пекин',
    category: 'WTA 1000',
    surface: 'Hard',
    date: new Date().toISOString(),
    status: 'LIVE',
    player1: generatePlayer('p5', 'Mirra Andreeva', 'Мирра Андреева', 19, 'RUS', 'WWWWL'),
    player2: generatePlayer('p6', 'Aryna Sabalenka', 'Арина Соболенко', 2, 'BLR', 'WWWWW'),
    score: {
      sets1: [6],
      sets2: [3],
      currentSet: 2,
      currentGame: '30-40'
    },
    bookmakers: [
      { bookmaker: 'PARI', odds1: 3.10, odds2: 1.38, margin: 4.7 },
      { bookmaker: 'FONBET', odds1: 3.20, odds2: 1.36, margin: 4.8 },
      { bookmaker: 'BETBOOM', odds1: 3.35, odds2: 1.35, margin: 3.9, isBestValue: true },
      { bookmaker: 'WINLINE', odds1: 3.15, odds2: 1.37, margin: 4.7 },
    ],
    prediction: {
      winnerId: 'p5',
      probability: 0.38,
      confidence: 'LOW',
      expectedValue: 1.27,
      suggestedOdds: 2.63,
      bestBookmaker: 'BETBOOM',
      bestOdds: 3.35,
      modelFactors: { headToHead: 0.4, recentForm: 0.9, surfaceProficiency: 0.75, fatigueIndex: 0.95 }
    }
  },
  {
    id: 'm4',
    tournament: 'ATP 500 Vienna',
    tournamentRu: 'ATP 500 Вена',
    category: 'ATP 500',
    surface: 'Hard',
    date: new Date(Date.now() + 7200000).toISOString(),
    status: 'UPCOMING',
    player1: generatePlayer('p7', 'Carlos Alcaraz', 'Карлос Алькарас', 2, 'ESP', 'WWLWW'),
    player2: generatePlayer('p8', 'Alexander Zverev', 'Александр Зверев', 3, 'GER', 'LWWWW'),
    bookmakers: [
      { bookmaker: 'PARI', odds1: 1.68, odds2: 2.25, margin: 3.9, isBestValue: true },
      { bookmaker: 'FONBET', odds1: 1.65, odds2: 2.20, margin: 6.0 },
      { bookmaker: 'BETBOOM', odds1: 1.66, odds2: 2.22, margin: 5.3 },
      { bookmaker: 'WINLINE', odds1: 1.64, odds2: 2.23, margin: 5.8 },
    ],
    prediction: {
      winnerId: 'p7',
      probability: 0.63,
      confidence: 'HIGH',
      expectedValue: 1.06,
      suggestedOdds: 1.58,
      bestBookmaker: 'PARI',
      bestOdds: 1.68,
      modelFactors: { headToHead: 0.6, recentForm: 0.85, surfaceProficiency: 0.89, fatigueIndex: 0.9 }
    }
  },
  {
    id: 'm5',
    tournament: 'ATP 500 Basel',
    tournamentRu: 'ATP 500 Базель',
    category: 'ATP 500',
    surface: 'Hard',
    date: new Date(Date.now() + 14400000).toISOString(),
    status: 'UPCOMING',
    player1: generatePlayer('p9', 'Novak Djokovic', 'Новак Джокович', 5, 'SRB', 'WWWWW'),
    player2: generatePlayer('p10', 'Stefanos Tsitsipas', 'Стефанос Циципас', 11, 'GRE', 'LWLWW'),
    bookmakers: [
      { bookmaker: 'PARI', odds1: 1.30, odds2: 3.65, margin: 4.3 },
      { bookmaker: 'FONBET', odds1: 1.33, odds2: 3.50, margin: 3.8 },
      { bookmaker: 'BETBOOM', odds1: 1.35, odds2: 3.60, margin: 1.8, isBestValue: true },
      { bookmaker: 'WINLINE', odds1: 1.32, odds2: 3.55, margin: 3.9 },
    ],
    prediction: {
      winnerId: 'p9',
      probability: 0.81,
      confidence: 'HIGH',
      expectedValue: 1.09,
      suggestedOdds: 1.23,
      bestBookmaker: 'BETBOOM',
      bestOdds: 1.35,
      modelFactors: { headToHead: 0.92, recentForm: 0.95, surfaceProficiency: 0.96, fatigueIndex: 0.88 }
    }
  },
  {
    id: 'm6',
    tournament: 'WTA 500 Ningbo',
    tournamentRu: 'WTA 500 Нинбо',
    category: 'WTA 500',
    surface: 'Hard',
    date: new Date(Date.now() + 21600000).toISOString(),
    status: 'UPCOMING',
    player1: generatePlayer('p11', 'Daria Kasatkina', 'Дарья Касаткина', 11, 'RUS', 'WWLWW'),
    player2: generatePlayer('p12', 'Elena Rybakina', 'Елена Рыбакина', 4, 'KAZ', 'WLWWW'),
    bookmakers: [
      { bookmaker: 'PARI', odds1: 2.85, odds2: 1.44, margin: 4.5 },
      { bookmaker: 'FONBET', odds1: 2.95, odds2: 1.42, margin: 4.3, isBestValue: true },
      { bookmaker: 'BETBOOM', odds1: 2.80, odds2: 1.45, margin: 4.7 },
      { bookmaker: 'WINLINE', odds1: 2.90, odds2: 1.43, margin: 4.4 },
    ],
    prediction: {
      winnerId: 'p11',
      probability: 0.42,
      confidence: 'MEDIUM',
      expectedValue: 1.24,
      suggestedOdds: 2.38,
      bestBookmaker: 'FONBET',
      bestOdds: 2.95,
      modelFactors: { headToHead: 0.45, recentForm: 0.8, surfaceProficiency: 0.82, fatigueIndex: 0.9 }
    }
  },
  {
    id: 'm7',
    tournament: 'ATP Challenger Brest',
    tournamentRu: 'ATP Челленджер Брест',
    category: 'Challenger',
    surface: 'Hard',
    date: new Date(Date.now() + 36000000).toISOString(),
    status: 'UPCOMING',
    player1: generatePlayer('p13', 'Roman Safiullin', 'Роман Сафиуллин', 58, 'RUS', 'WWLWL'),
    player2: generatePlayer('p14', 'Aslan Karatsev', 'Аслан Карацев', 104, 'RUS', 'LWWLW'),
    bookmakers: [
      { bookmaker: 'PARI', odds1: 1.75, odds2: 2.10, margin: 4.8, isBestValue: true },
      { bookmaker: 'FONBET', odds1: 1.72, odds2: 2.12, margin: 5.3 },
      { bookmaker: 'BETBOOM', odds1: 1.74, odds2: 2.08, margin: 5.5 },
      { bookmaker: 'WINLINE', odds1: 1.70, odds2: 2.15, margin: 5.3 },
    ],
    prediction: {
      winnerId: 'p13',
      probability: 0.64,
      confidence: 'HIGH',
      expectedValue: 1.12,
      suggestedOdds: 1.56,
      bestBookmaker: 'PARI',
      bestOdds: 1.75,
      modelFactors: { headToHead: 0.5, recentForm: 0.75, surfaceProficiency: 0.85, fatigueIndex: 0.8 }
    }
  },
  {
    id: 'm8',
    tournament: 'ATP 250 Almaty',
    tournamentRu: 'ATP 250 Алматы',
    category: 'ATP 500',
    surface: 'Hard',
    date: new Date(Date.now() + 50000000).toISOString(),
    status: 'UPCOMING',
    player1: generatePlayer('p15', 'Pavel Kotov', 'Павел Котов', 62, 'RUS', 'LWLWW'),
    player2: generatePlayer('p16', 'Alexander Bublik', 'Александр Бублик', 32, 'KAZ', 'WWLWL'),
    bookmakers: [
      { bookmaker: 'PARI', odds1: 2.30, odds2: 1.62, margin: 5.2 },
      { bookmaker: 'FONBET', odds1: 2.35, odds2: 1.60, margin: 5.0 },
      { bookmaker: 'BETBOOM', odds1: 2.42, odds2: 1.60, margin: 3.8, isBestValue: true },
      { bookmaker: 'WINLINE', odds1: 2.32, odds2: 1.61, margin: 5.2 },
    ],
    prediction: {
      winnerId: 'p15',
      probability: 0.48,
      confidence: 'MEDIUM',
      expectedValue: 1.16,
      suggestedOdds: 2.08,
      bestBookmaker: 'BETBOOM',
      bestOdds: 2.42,
      modelFactors: { headToHead: 0.55, recentForm: 0.7, surfaceProficiency: 0.78, fatigueIndex: 0.85 }
    }
  },
  {
    id: 'm9',
    tournament: 'WTA 500 Tokyo',
    tournamentRu: 'WTA 500 Токио',
    category: 'WTA 500',
    surface: 'Hard',
    date: new Date(Date.now() + 65000000).toISOString(),
    status: 'UPCOMING',
    player1: generatePlayer('p17', 'Diana Shnaider', 'Диана Шнайдер', 16, 'RUS', 'WWWLW'),
    player2: generatePlayer('p18', 'Zheng Qinwen', 'Чжэн Циньвэнь', 7, 'CHN', 'WWWWW'),
    bookmakers: [
      { bookmaker: 'PARI', odds1: 2.50, odds2: 1.53, margin: 5.3 },
      { bookmaker: 'FONBET', odds1: 2.60, odds2: 1.50, margin: 5.1, isBestValue: true },
      { bookmaker: 'BETBOOM', odds1: 2.55, odds2: 1.52, margin: 5.0 },
      { bookmaker: 'WINLINE', odds1: 2.48, odds2: 1.54, margin: 5.2 },
    ],
    prediction: {
      winnerId: 'p17',
      probability: 0.44,
      confidence: 'LOW',
      expectedValue: 1.14,
      suggestedOdds: 2.27,
      bestBookmaker: 'FONBET',
      bestOdds: 2.60,
      modelFactors: { headToHead: 0.5, recentForm: 0.88, surfaceProficiency: 0.8, fatigueIndex: 0.72 }
    }
  },
  {
    id: 'm10',
    tournament: 'ATP Masters 1000 Shanghai Finals',
    tournamentRu: 'ATP Мастерс 1000 Шанхай (Финал)',
    category: 'ATP 1000',
    surface: 'Hard',
    date: new Date(Date.now() - 86400000).toISOString(),
    status: 'FINISHED',
    player1: generatePlayer('p19', 'Taylor Fritz', 'Тейлор Фриц', 7, 'USA', 'WWWWL'),
    player2: generatePlayer('p20', 'Daniil Medvedev', 'Даниил Медведев', 4, 'RUS', 'WWWWW'),
    score: {
      sets1: [4, 4],
      sets2: [6, 6]
    },
    bookmakers: [
      { bookmaker: 'PARI', odds1: 2.45, odds2: 1.55, margin: 5.3 },
      { bookmaker: 'FONBET', odds1: 2.50, odds2: 1.53, margin: 5.3 },
      { bookmaker: 'BETBOOM', odds1: 2.48, odds2: 1.56, margin: 4.4, isBestValue: true },
      { bookmaker: 'WINLINE', odds1: 2.42, odds2: 1.55, margin: 5.8 },
    ],
    prediction: {
      winnerId: 'p20',
      probability: 0.68,
      confidence: 'HIGH',
      expectedValue: 1.06,
      suggestedOdds: 1.47,
      bestBookmaker: 'BETBOOM',
      bestOdds: 1.56,
      modelFactors: { headToHead: 0.7, recentForm: 0.9, surfaceProficiency: 0.94, fatigueIndex: 0.85 }
    }
  },
  {
    id: 'm11',
    tournament: 'ATP Challenger Bratislava',
    tournamentRu: 'ATP Челленджер Братислава',
    category: 'Challenger',
    surface: 'Hard',
    date: new Date(Date.now() + 86400000).toISOString(),
    status: 'UPCOMING',
    player1: generatePlayer('p21', 'Alibek Kachmazov', 'Алибек Качмазов', 179, 'RUS', 'WLLWW'),
    player2: generatePlayer('p22', 'Marton Fucsovics', 'Мартон Фучович', 88, 'HUN', 'LWLWL'),
    bookmakers: [
      { bookmaker: 'PARI', odds1: 2.70, odds2: 1.46, margin: 5.5, isBestValue: true },
      { bookmaker: 'FONBET', odds1: 2.65, odds2: 1.47, margin: 5.7 },
      { bookmaker: 'BETBOOM', odds1: 2.60, odds2: 1.48, margin: 6.0 },
      { bookmaker: 'WINLINE', odds1: 2.62, odds2: 1.46, margin: 6.6 },
    ],
    prediction: {
      winnerId: 'p21',
      probability: 0.43,
      confidence: 'LOW',
      expectedValue: 1.16,
      suggestedOdds: 2.32,
      bestBookmaker: 'PARI',
      bestOdds: 2.70,
      modelFactors: { headToHead: 0.5, recentForm: 0.7, surfaceProficiency: 0.75, fatigueIndex: 0.9 }
    }
  },
  {
    id: 'm12',
    tournament: 'WTA 1000 Wuhan',
    tournamentRu: 'WTA 1000 Ухань',
    category: 'WTA 1000',
    surface: 'Hard',
    date: new Date(Date.now() - 172800000).toISOString(),
    status: 'FINISHED',
    player1: generatePlayer('p23', 'Anastasia Potapova', 'Анастасия Потапова', 38, 'RUS', 'WWLWL'),
    player2: generatePlayer('p24', 'Erika Andreeva', 'Эрика Андреева', 65, 'RUS', 'WLWWW'),
    score: {
      sets1: [6, 3, 7],
      sets2: [4, 6, 5]
    },
    bookmakers: [
      { bookmaker: 'PARI', odds1: 1.80, odds2: 2.02, margin: 5.0 },
      { bookmaker: 'FONBET', odds1: 1.83, odds2: 2.00, margin: 4.6, isBestValue: true },
      { bookmaker: 'BETBOOM', odds1: 1.81, odds2: 1.99, margin: 5.5 },
      { bookmaker: 'WINLINE', odds1: 1.78, odds2: 2.01, margin: 5.9 },
    ],
    prediction: {
      winnerId: 'p23',
      probability: 0.58,
      confidence: 'MEDIUM',
      expectedValue: 1.06,
      suggestedOdds: 1.72,
      bestBookmaker: 'FONBET',
      bestOdds: 1.83,
      modelFactors: { headToHead: 0.6, recentForm: 0.75, surfaceProficiency: 0.8, fatigueIndex: 0.8 }
    }
  }
];

export const MOCK_MODEL_STATS: ModelStats = {
  version: 'v10.4.8-ru-quant',
  accuracy: 0.692,
  roi: 0.138,
  totalPredictions: 145820,
  profitableMonths: 114,
  lastUpdated: new Date().toISOString(),
  trainingDataSize: '16.4 TB'
};

export const MOCK_CHART_DATA = Array.from({ length: 30 }).map((_, i) => ({
  date: new Date(Date.now() - (30 - i) * 86400000).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
  roi: 10 + Math.sin(i / 3) * 5 + i * 0.5,
  accuracy: 62 + Math.cos(i / 4) * 4 + Math.random() * 2
}));
