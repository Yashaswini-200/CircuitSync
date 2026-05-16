import React from 'react';

type Props = {
  year: number;
  month: number; // 0-based
  selected?: string; // YYYY-MM-DD
  activityMap?: Record<string, number>;
  onSelect?: (dateStr: string) => void;
};

const weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export const CalendarMonth: React.FC<Props> = ({ year, month, selected, activityMap = {}, onSelect }) => {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const days = [] as Array<{d:number, date: Date}>;

  const leading = first.getDay();
  for (let i = 0; i < leading; i++) {
    days.push({ d: 0, date: new Date(year, month, i - leading + 1) });
  }
  for (let d = 1; d <= last.getDate(); d++) {
    days.push({ d, date: new Date(year, month, d) });
  }

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-black/30 p-4 rounded-lg border border-white/5 overflow-x-auto">
      <div className="min-w-[280px]">
        <div className="grid grid-cols-7 gap-2 text-xs text-gray-400 mb-2">
          {weekdays.map((w) => <div key={w} className="text-center">{w}</div>)}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((item, idx) => {
            const dateStr = item.d === 0 ? null : item.date.toISOString().split('T')[0];
            const activity = dateStr ? activityMap[dateStr] || 0 : 0;
            const isSelected = dateStr && selected === dateStr;
            const isToday = dateStr === todayStr;

            const base = 'h-12 flex items-start justify-start p-2 rounded-lg transition-all cursor-pointer';
            const cls = item.d === 0
              ? 'bg-transparent cursor-default opacity-30'
              : `${base} ${isSelected ? 'ring-2 ring-cyan-400 bg-white/6' : 'hover:bg-white/5'} ${isToday ? 'glow-today' : ''}`;

            return (
              <div key={idx} className={cls} onClick={() => dateStr && onSelect && onSelect(dateStr)}>
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <div className={`text-sm ${item.d === 0 ? 'text-gray-600' : 'text-gray-100'}`}>{item.d || ''}</div>
                    {activity > 0 && (
                      <div className="w-2 h-2 rounded-full bg-cyan-400 glow-xs" />
                    )}
                  </div>
                  {activity > 0 && (
                    <div className="mt-2 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400" style={{ width: `${Math.min(100, activity)}%` }} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarMonth;
