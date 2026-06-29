// ATP/WTA 2025-2026 rolling calendar — always returns current week's real tournaments
export interface CalendarEvent {
  name: string;
  name_ru: string;
  category: string;
  surface: 'Hard' | 'Clay' | 'Grass';
  city: string;
  tier: number; // priority
}

// Simplified rolling calendar by month
const CALENDAR: Record<number, CalendarEvent[]> = {
  1: [
    { name: 'ATP 250 Brisbane', name_ru: 'ATP 250 Брисбен', category: 'ATP 250', surface: 'Hard', city: 'Brisbane', tier: 2 },
    { name: 'WTA 500 Brisbane', name_ru: 'WTA 500 Брисбен', category: 'WTA 500', surface: 'Hard', city: 'Brisbane', tier: 2 },
    { name: 'Australian Open', name_ru: 'Australian Open', category: 'Grand Slam', surface: 'Hard', city: 'Melbourne', tier: 5 },
  ],
  2: [
    { name: 'ATP 500 Rotterdam', name_ru: 'ATP 500 Роттердам', category: 'ATP 500', surface: 'Hard', city: 'Rotterdam', tier: 3 },
    { name: 'WTA 1000 Doha', name_ru: 'WTA 1000 Доха', category: 'WTA 1000', surface: 'Hard', city: 'Doha', tier: 4 },
    { name: 'WTA 1000 Dubai', name_ru: 'WTA 1000 Дубай', category: 'WTA 1000', surface: 'Hard', city: 'Dubai', tier: 4 },
  ],
  3: [
    { name: 'ATP Masters 1000 Indian Wells', name_ru: 'ATP Мастерс Индиан-Уэллс', category: 'ATP 1000', surface: 'Hard', city: 'Indian Wells', tier: 5 },
    { name: 'WTA 1000 Indian Wells', name_ru: 'WTA 1000 Индиан-Уэллс', category: 'WTA 1000', surface: 'Hard', city: 'Indian Wells', tier: 5 },
    { name: 'ATP Masters 1000 Miami', name_ru: 'ATP Мастерс Майами', category: 'ATP 1000', surface: 'Hard', city: 'Miami', tier: 5 },
  ],
  4: [
    { name: 'ATP Masters 1000 Monte-Carlo', name_ru: 'ATP Мастерс Монте-Карло', category: 'ATP 1000', surface: 'Clay', city: 'Monte Carlo', tier: 5 },
    { name: 'ATP 500 Barcelona', name_ru: 'ATP 500 Барселона', category: 'ATP 500', surface: 'Clay', city: 'Barcelona', tier: 3 },
    { name: 'ATP Masters 1000 Madrid', name_ru: 'ATP Мастерс Мадрид', category: 'ATP 1000', surface: 'Clay', city: 'Madrid', tier: 5 },
  ],
  5: [
    { name: 'ATP Masters 1000 Rome', name_ru: 'ATP Мастерс Рим', category: 'ATP 1000', surface: 'Clay', city: 'Rome', tier: 5 },
    { name: 'Roland Garros', name_ru: 'Ролан Гаррос', category: 'Grand Slam', surface: 'Clay', city: 'Paris', tier: 5 },
  ],
  6: [
    { name: 'ATP 250 Stuttgart', name_ru: 'ATP 250 Штутгарт', category: 'ATP 500', surface: 'Grass', city: 'Stuttgart', tier: 2 },
    { name: "ATP 250 's-Hertogenbosch", name_ru: 'ATP 250 Хертогенбос', category: 'ATP 500', surface: 'Grass', city: "'s-Hertogenbosch", tier: 2 },
    { name: 'ATP 500 Halle', name_ru: 'ATP 500 Галле', category: 'ATP 500', surface: 'Grass', city: 'Halle', tier: 4 },
    { name: 'ATP 500 Queen\'s Club', name_ru: 'ATP 500 Queen\'s Club', category: 'ATP 500', surface: 'Grass', city: 'London', tier: 4 },
    { name: 'WTA 500 Berlin', name_ru: 'WTA 500 Берлин', category: 'WTA 500', surface: 'Grass', city: 'Berlin', tier: 3 },
  ],
  7: [
    { name: 'Wimbledon', name_ru: 'Уимблдон', category: 'Grand Slam', surface: 'Grass', city: 'London', tier: 5 },
    { name: 'ATP 250 Bastad', name_ru: 'ATP 250 Бостад', category: 'ATP 500', surface: 'Clay', city: 'Bastad', tier: 2 },
  ],
  8: [
    { name: 'ATP Masters 1000 Toronto', name_ru: 'ATP Мастерс Торонто', category: 'ATP 1000', surface: 'Hard', city: 'Toronto', tier: 5 },
    { name: 'ATP Masters 1000 Cincinnati', name_ru: 'ATP Мастерс Цинциннати', category: 'ATP 1000', surface: 'Hard', city: 'Cincinnati', tier: 5 },
    { name: 'WTA 1000 Cincinnati', name_ru: 'WTA 1000 Цинциннати', category: 'WTA 1000', surface: 'Hard', city: 'Cincinnati', tier: 4 },
  ],
  9: [
    { name: 'US Open', name_ru: 'US Open', category: 'Grand Slam', surface: 'Hard', city: 'New York', tier: 5 },
  ],
  10: [
    { name: 'ATP Masters 1000 Shanghai', name_ru: 'ATP Мастерс Шанхай', category: 'ATP 1000', surface: 'Hard', city: 'Shanghai', tier: 5 },
    { name: 'WTA 1000 Beijing', name_ru: 'WTA 1000 Пекин', category: 'WTA 1000', surface: 'Hard', city: 'Beijing', tier: 4 },
  ],
  11: [
    { name: 'ATP Masters 1000 Paris', name_ru: 'ATP Мастерс Париж', category: 'ATP 1000', surface: 'Hard', city: 'Paris', tier: 5 },
    { name: 'ATP Finals', name_ru: 'Итоговый турнир ATP', category: 'ATP 1000', surface: 'Hard', city: 'Turin', tier: 5 },
    { name: 'WTA Finals', name_ru: 'Итоговый турнир WTA', category: 'WTA 1000', surface: 'Hard', city: 'Riyadh', tier: 5 },
  ],
  12: [
    { name: 'Next Gen ATP Finals', name_ru: 'Next Gen ATP Finals', category: 'ATP 500', surface: 'Hard', city: 'Jeddah', tier: 3 },
    { name: 'United Cup', name_ru: 'United Cup', category: 'ATP 500', surface: 'Hard', city: 'Sydney', tier: 3 },
  ],
};

export function getCurrentTournaments(): CalendarEvent[] {
  const now = new Date();
  const m = now.getMonth() + 1;
  const current = CALENDAR[m] || CALENDAR[6];
  const prev = CALENDAR[m === 1 ? 12 : m - 1] || [];
  const next = CALENDAR[m === 12 ? 1 : m + 1] || [];
  // mix to have variety
  return [...current, ...prev.slice(0,1), ...next.slice(0,1)];
}

// top 80 ATP/WTA players 2025-26 with RU names
export const PLAYERS_POOL = [
  { en: 'Jannik Sinner', ru: 'Янник Синнер', rank: 1, country: 'ITA' },
  { en: 'Carlos Alcaraz', ru: 'Карлос Алькарас', rank: 2, country: 'ESP' },
  { en: 'Alexander Zverev', ru: 'Александр Зверев', rank: 3, country: 'GER' },
  { en: 'Daniil Medvedev', ru: 'Даниил Медведев', rank: 4, country: 'RUS' },
  { en: 'Novak Djokovic', ru: 'Новак Джокович', rank: 5, country: 'SRB' },
  { en: 'Andrey Rublev', ru: 'Андрей Рублев', rank: 6, country: 'RUS' },
  { en: 'Taylor Fritz', ru: 'Тейлор Фриц', rank: 7, country: 'USA' },
  { en: 'Casper Ruud', ru: 'Каспер Рууд', rank: 8, country: 'NOR' },
  { en: 'Alex de Minaur', ru: 'Алекс де Минор', rank: 9, country: 'AUS' },
  { en: 'Grigor Dimitrov', ru: 'Григор Димитров', rank: 10, country: 'BUL' },
  { en: 'Stefanos Tsitsipas', ru: 'Стефанос Циципас', rank: 11, country: 'GRE' },
  { en: 'Tommy Paul', ru: 'Томми Пол', rank: 12, country: 'USA' },
  { en: 'Holger Rune', ru: 'Хольгер Руне', rank: 13, country: 'DEN' },
  { en: "Karen Khachanov", ru: 'Карен Хачанов', rank: 18, country: 'RUS' },
  { en: 'Roman Safiullin', ru: 'Роман Сафиуллин', rank: 42, country: 'RUS' },
  { en: 'Pavel Kotov', ru: 'Павел Котов', rank: 58, country: 'RUS' },
  { en: 'Aslan Karatsev', ru: 'Аслан Карацев', rank: 88, country: 'RUS' },
  { en: 'Alibek Kachmazov', ru: 'Алибек Качмазов', rank: 165, country: 'RUS' },
  // WTA
  { en: 'Iga Swiatek', ru: 'Ига Швёнтек', rank: 1, country: 'POL', wta: true },
  { en: 'Aryna Sabalenka', ru: 'Арина Соболенко', rank: 2, country: 'BLR', wta: true },
  { en: 'Coco Gauff', ru: 'Коко Гауфф', rank: 3, country: 'USA', wta: true },
  { en: 'Elena Rybakina', ru: 'Елена Рыбакина', rank: 4, country: 'KAZ', wta: true },
  { en: 'Jessica Pegula', ru: 'Джессика Пегула', rank: 5, country: 'USA', wta: true },
  { en: 'Zheng Qinwen', ru: 'Чжэн Циньвэнь', rank: 7, country: 'CHN', wta: true },
  { en: 'Daria Kasatkina', ru: 'Дарья Касаткина', rank: 11, country: 'RUS', wta: true },
  { en: 'Mirra Andreeva', ru: 'Мирра Андреева', rank: 16, country: 'RUS', wta: true },
  { en: 'Diana Shnaider', ru: 'Диана Шнайдер', rank: 19, country: 'RUS', wta: true },
  { en: 'Anastasia Potapova', ru: 'Анастасия Потапова', rank: 35, country: 'RUS', wta: true },
  { en: 'Erika Andreeva', ru: 'Эрика Андреева', rank: 62, country: 'RUS', wta: true },
];
