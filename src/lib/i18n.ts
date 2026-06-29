import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';

export interface Translations {
  appTitle: string;
  appSubtitle: string;
  modelStatus: string;
  onlinePredicting: string;
  searchPlaceholder: string;
  adminAccess: string;
  quantTeam: string;
  
  // Sidebar
  navDashboard: string;
  navLive: string;
  navUpcoming: string;
  navModel: string;
  navHistory: string;
  navBookmakers: string;
  navCabinet: string;

  // Notifications
  notifications: string;
  notificationsEmpty: string;
  markAllRead: string;
  notificationValue: string;
  notificationOdds: string;
  notificationLive: string;
  notificationSystem: string;
  notificationWin: string;

  // Dashboard
  overviewTitle: string;
  overviewSubtitle: string;
  modelAccuracy: string;
  totalRoi: string;
  totalPredictions: string;
  trainingData: string;
  fromLastMonth: string;
  profitableMonths: string;
  acrossTours: string;
  updatedTime: string;
  yieldCurve: string;
  recentInsights: string;
  
  // Insights
  insight1Title: string;
  insight1Desc: string;
  insight2Title: string;
  insight2Desc: string;
  insight3Title: string;
  insight3Desc: string;

  // Matches
  liveTitle: string;
  upcomingTitle: string;
  finishedTitle: string;
  predictedWinner: string;
  winProbability: string;
  suggestedOdds: string;
  marketOdds: string;
  bestOddsAt: string;
  valueBetDetected: string;
  confidenceHigh: string;
  confidenceMed: string;
  confidenceLow: string;
  filterAll: string;
  filterLive: string;
  filterUpcoming: string;
  filterBookmaker: string;
  filterCategory: string;
  searchMatches: string;
  compareBookmakers: string;
  bookmakerQuotes: string;

  // Model Metrics
  diagnosticsTitle: string;
  diagnosticsSubtitle: string;
  inferenceLatency: string;
  featureImportance: string;
  featH2H: string;
  featRecentForm: string;
  featSurfaceElo: string;
  featFatigue: string;
  featServeReturn: string;
  featBreakPoints: string;
  featWeather: string;
  featCrowd: string;
  trainingConvergence: string;
  dataDriftWarning: string;
  dataDriftDesc: string;
  expectedVal: string;
  observedVal: string;
  historicalBacktest: string;
  
  // History
  historyTitle: string;
  historyDesc: string;
}

export const translations: Record<Language, Translations> = {
  ru: {
    appTitle: 'NetPredict AI',
    appSubtitle: 'Квантовое прогнозирование в теннисе',
    modelStatus: 'Статус нейросети',
    onlinePredicting: 'Онлайн • Предиктивный режим',
    searchPlaceholder: 'Поиск игроков, турниров, БК...',
    adminAccess: 'Доступ уровня Quant-Lead',
    quantTeam: 'Квант-Команда Альфа',

    navDashboard: 'Дашборд и ROI',
    navLive: 'Live Прогнозы',
    navUpcoming: 'Линия и Валуи',
    navModel: 'Диагностика Нейросети',
    navHistory: 'Исторический Бэктест',
    navBookmakers: 'Сравнение котировок БК',
    navCabinet: 'Личный кабинет',

    notifications: 'Уведомления',
    notificationsEmpty: 'Новых уведомлений нет',
    markAllRead: 'Отметить все прочитанными',
    notificationValue: 'Валуй',
    notificationOdds: 'Движение линии',
    notificationLive: 'LIVE',
    notificationSystem: 'Система',
    notificationWin: 'Выигрыш',

    overviewTitle: 'Оперативный Дашборд',
    overviewSubtitle: 'Мониторинг доходности алгоритма в реальном времени и арбитраж РФ БК',
    modelAccuracy: 'Точность предсказаний',
    totalRoi: 'Итоговый ROI (Доходность)',
    totalPredictions: 'Всего обработано матчей',
    trainingData: 'Объем датасета нейросети',
    fromLastMonth: '+2.4% по сравнению с прошлым месяцем',
    profitableMonths: 'Стабильный плюс на протяжении 114 месяцев',
    acrossTours: 'Турниры ATP, WTA, Challenger, ITF',
    updatedTime: 'Обновлено в реальном времени',
    yieldCurve: 'Кривая доходности модели (30 дней)',
    recentInsights: 'Системные инсайты и сигналы алгоритма',

    insight1Title: 'Аномалия скорости покрытия (Астана / ATP)',
    insight1Desc: 'Корты в зале играются на 5.2% быстрее средних показателей харда. Пересчитаны веса подачи для Рублева и Хачанова.',
    insight2Title: 'Арбитраж в котировках PARI / FONBET',
    insight2Desc: 'Выявлен существенный перевес линии в матче Медведев - Синнер. Модель дает 61% на победу Даниила, PARI предлагает 2.05.',
    insight3Title: 'Калибровка усталости (Индекс смены часовых поясов)',
    insight3Desc: 'Интегрированы данные перелетов игроков после турниров в Азии. Повышена вероятность апсетов на фаворитах.',

    liveTitle: 'Live Прогнозы (В реальном времени)',
    upcomingTitle: 'Предиктивная линия матчей (Валуйные ставки)',
    finishedTitle: 'Завершенные матчи',
    predictedWinner: 'Прогноз нейросети',
    winProbability: 'Вероятность победы',
    suggestedOdds: 'Честный кэф (Модель)',
    marketOdds: 'Лучший кэф на рынке',
    bestOddsAt: 'Лучший кэф в',
    valueBetDetected: 'ВАЛУЙНАЯ СТАВКА (Перевес над линией',
    confidenceHigh: 'ВЫСОКАЯ УВЕРЕННОСТЬ',
    confidenceMed: 'СРЕДНЯЯ УВЕРЕННОСТЬ',
    confidenceLow: 'РИСКОВЫЙ ИСХОД',
    filterAll: 'Все турниры',
    filterLive: 'Только Live',
    filterUpcoming: 'Предстоящие',
    filterBookmaker: 'Фильтр по БК:',
    filterCategory: 'Категория:',
    searchMatches: 'Найти теннисиста...',
    compareBookmakers: 'Сравнить линии БК РФ',
    bookmakerQuotes: 'Котировки российских легальных БК:',

    diagnosticsTitle: 'Диагностика ML-Модели v10.4',
    diagnosticsSubtitle: 'Архитектура глубокого обучения с вниманием (Attention) и матрицей Эло',
    inferenceLatency: 'Задержка инференса: 38 мс',
    featureImportance: 'Весовые коэффициенты признаков (Feature Importance)',
    featH2H: 'Личные встречи (Head-to-Head)',
    featRecentForm: 'Текущая форма за 90 дней',
    featSurfaceElo: 'Динамический рейтинг Эло на покрытии',
    featFatigue: 'Индекс усталости и часовые пояса',
    featServeReturn: 'Дельта эффективности подачи / приема',
    featBreakPoints: 'Реализация и спасение брейкпоинтов',
    featWeather: 'Погодные условия (влажность, ветер)',
    featCrowd: 'Сентимент трибун и психология (NLP)',
    trainingConvergence: 'Схождение обучения (Эпохи 1k-10k)',
    dataDriftWarning: 'Предупреждение о сдвиге распределения (Data Drift)',
    dataDriftDesc: 'Обнаружено отклонение процента попадания первой подачи на турнирах в Азии на 3.4%. Модель автоматически применила байесовскую коррекцию.',
    expectedVal: 'Ожидаемый %',
    observedVal: 'Фактический %',
    historicalBacktest: 'Результаты исторического бэктеста (2014–2026)',

    historyTitle: 'Архив прогнозов и база знаний (10+ лет)',
    historyDesc: 'В базе данных сохранено более 145 000 разобранных матчей с детальной историей движения линий в PARI, FONBET и BETBOOM. Для выгрузки в формате CSV/JSON воспользуйтесь терминальным API-клиентом.',
  },
  en: {
    appTitle: 'NetPredict AI',
    appSubtitle: 'Quantitative Tennis Forecasting',
    modelStatus: 'Model Status',
    onlinePredicting: 'Online • Predictive Mode',
    searchPlaceholder: 'Search players, tournaments, bookmakers...',
    adminAccess: 'Quant-Lead Access',
    quantTeam: 'Alpha Quant Team',

    navDashboard: 'Dashboard & ROI',
    navLive: 'Live Predictions',
    navUpcoming: 'Upcoming & Value Bets',
    navModel: 'Model Diagnostics',
    navHistory: 'Historical Backtest',
    navBookmakers: 'Bookmaker Odds Matrix',
    navCabinet: 'My Account',

    notifications: 'Notifications',
    notificationsEmpty: 'No new notifications',
    markAllRead: 'Mark all as read',
    notificationValue: 'Value Bet',
    notificationOdds: 'Odds Move',
    notificationLive: 'LIVE',
    notificationSystem: 'System',
    notificationWin: 'Win',

    overviewTitle: 'Operational Overview',
    overviewSubtitle: 'Real-time algorithm yield tracking & Russian bookmakers arbitrage',
    modelAccuracy: 'Model Accuracy',
    totalRoi: 'Total Yield (ROI)',
    totalPredictions: 'Total Processed Matches',
    trainingData: 'Neural Dataset Size',
    fromLastMonth: '+2.4% compared to last month',
    profitableMonths: 'Consistently profitable for 114 consecutive months',
    acrossTours: 'ATP, WTA, Challenger & ITF tours',
    updatedTime: 'Updated in real-time',
    yieldCurve: 'Model Yield Curve (30 Days)',
    recentInsights: 'System Insights & Algorithmic Signals',

    insight1Title: 'Surface Speed Anomaly (Astana / ATP)',
    insight1Desc: 'Indoor hard courts playing 5.2% faster than historic average. Serve advantage weights adjusted for Rublev and Khachanov.',
    insight2Title: 'Arbitrage Alert: PARI vs FONBET',
    insight2Desc: 'Significant edge detected in Medvedev vs Sinner. Model probability for Daniil is 61%, PARI offers 2.05 odds.',
    insight3Title: 'Fatigue Calibration (Time-zone Shift Index)',
    insight3Desc: 'Integrated flight logs following Asian swing tournaments. Upset probability elevated for fatigued favorites.',

    liveTitle: 'Live Match Predictions',
    upcomingTitle: 'Predictive Match Line (Value Bets)',
    finishedTitle: 'Finished Matches',
    predictedWinner: 'Predicted Winner',
    winProbability: 'Win Probability',
    suggestedOdds: 'Fair Odds (Model)',
    marketOdds: 'Best Market Odds',
    bestOddsAt: 'Best Odds at',
    valueBetDetected: 'VALUE BET DETECTED (Edge',
    confidenceHigh: 'HIGH CONFIDENCE',
    confidenceMed: 'MEDIUM CONFIDENCE',
    confidenceLow: 'SPECULATIVE EDGE',
    filterAll: 'All Tournaments',
    filterLive: 'Live Only',
    filterUpcoming: 'Upcoming',
    filterBookmaker: 'Filter by Bookmaker:',
    filterCategory: 'Category:',
    searchMatches: 'Search player...',
    compareBookmakers: 'Compare Russian Bookmakers',
    bookmakerQuotes: 'Quotes from official Russian Bookmakers:',

    diagnosticsTitle: 'ML Model Diagnostics v10.4',
    diagnosticsSubtitle: 'Deep attention neural architecture coupled with dynamic surface Elo priors',
    inferenceLatency: 'Inference Latency: 38ms',
    featureImportance: 'Feature Importance Weights',
    featH2H: 'Head-to-Head History',
    featRecentForm: 'Recent Form (90-day window)',
    featSurfaceElo: 'Dynamic Surface Elo Rating',
    featFatigue: 'Fatigue & Time-zone Index',
    featServeReturn: 'Serve / Return Efficiency Delta',
    featBreakPoints: 'Break Point Conversion & Save %',
    featWeather: 'Environmental / Weather Conditions',
    featCrowd: 'Crowd Sentiment & Psychology (NLP)',
    trainingConvergence: 'Training Convergence (Epochs 1k-10k)',
    dataDriftWarning: 'Data Drift Warning',
    dataDriftDesc: 'Detected 3.4% shift in 1st serve accuracy distributions across indoor swing. Model automatically applied Bayesian posterior correction.',
    expectedVal: 'Expected %',
    observedVal: 'Observed %',
    historicalBacktest: 'Historical Backtest Results (2014–2026)',

    historyTitle: 'Prediction Archive & Knowledge Base (10+ Yrs)',
    historyDesc: 'Our database holds over 145,000 parsed tennis matches with historical odds movement logs across PARI, FONBET, and BETBOOM. Use our terminal API endpoint for bulk CSV/JSON extraction.',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'ru',
  setLanguage: () => {},
  t: translations.ru,
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  return React.createElement(
    LanguageContext.Provider,
    { value: { language, setLanguage, t: translations[language] } },
    children
  );
};

export const useLanguage = () => useContext(LanguageContext);
