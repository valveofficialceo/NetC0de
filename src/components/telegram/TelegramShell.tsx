import { useEffect, useState } from 'react';
import telegram from '../../lib/telegram';
import { useLanguage } from '../../lib/i18n';

export function TelegramShell() {
  const [isTma, setIsTma] = useState(false);
  const [tgUser, setTgUser] = useState<any>(null);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const ok = telegram.init();
    const available = telegram.isAvailable();
    setIsTma(available || ok);

    const user = telegram.user();
    if (user) {
      setTgUser(user);
      // Авто-язык из Telegram
      if (user.language_code === 'ru' && language !== 'ru') {
        setLanguage('ru');
      }
      if (user.language_code && user.language_code.startsWith('en') && language !== 'en') {
        setLanguage('en');
      }
      telegram.haptic('success');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isTma || !tgUser) return null;

  return (
    <div className="sticky top-0 z-[60] bg-[#111827]/95 backdrop-blur-xl border-b border-blue-500/20">
      <div className="px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <img 
            src={tgUser.photo_url || `https://unavatar.io/telegram/${tgUser.username || 'durov'}`} 
            alt="avatar"
            className="w-7 h-7 rounded-full ring-2 ring-blue-500/40"
            onError={(e) => ((e.currentTarget.style.display='none'))}
          />
          <div>
            <div className="font-bold leading-tight text-foreground">
              {tgUser.first_name} {tgUser.last_name || ''}
              {tgUser.is_premium && <span className="ml-1">⭐</span>}
            </div>
            <div className="text-[10px] text-blue-400 font-mono">
              @{tgUser.username || 'quant_user'} • ID {tgUser.id}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-muted-foreground">Telegram Mini App</div>
          <div className="text-[10px] font-mono text-green-400">v{telegram.version()} • secure</div>
        </div>
      </div>
    </div>
  );
}
