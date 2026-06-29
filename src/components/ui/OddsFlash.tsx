import { useEffect, useRef, useState } from 'react';

export function OddsFlash({ value, className = '' }: { value: number | string; className?: string }) {
  const prev = useRef<number | null>(null);
  const [flash, setFlash] = useState<'up'|'down'|null>(null);

  useEffect(() => {
    const num = typeof value === 'number' ? value : parseFloat(String(value));
    if (prev.current !== null && !isNaN(num)) {
      if (num > prev.current + 0.005) {
        setFlash('up');
        setTimeout(()=>setFlash(null), 650);
      } else if (num < prev.current - 0.005) {
        setFlash('down');
        setTimeout(()=>setFlash(null), 650);
      }
    }
    prev.current = isNaN(num) ? null : num;
  }, [value]);

  return (
    <span className={`font-mono transition-colors duration-300 px-1 rounded ${className} ${
      flash === 'up' ? 'bg-green-500/25 text-green-300' :
      flash === 'down' ? 'bg-red-500/25 text-red-300' : ''
    }`}>
      {typeof value === 'number' ? value.toFixed(2) : value}
    </span>
  );
}
