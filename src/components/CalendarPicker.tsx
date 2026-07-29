import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarPickerProps {
  value?: string;
  onChange: (dateStr: string) => void;
}

export const CalendarPicker: React.FC<CalendarPickerProps> = ({ value, onChange }) => {
  const today = new Date();
  const [displayDate, setDisplayDate] = useState(() => {
    if (value) {
      const parsed = new Date(value);
      if (!isNaN(parsed.getTime())) return parsed;
    }
    return new Date();
  });

  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDisplayDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDisplayDate(new Date(year, month + 1, 1));
  };

  // Get total days in month and starting day index
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const handleSelectDay = (dayNum: number) => {
    const selected = new Date(year, month, dayNum);
    // Format e.g. "Aug 15, 2026"
    const formatted = selected.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    onChange(formatted);
  };

  // Check if a given day is selected
  const isSelected = (dayNum: number) => {
    if (!value) return false;
    const current = new Date(year, month, dayNum);
    const formattedCurrent = current.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    return value === formattedCurrent || value === current.toISOString().split('T')[0];
  };

  // Check if a day is today
  const isToday = (dayNum: number) => {
    return (
      today.getDate() === dayNum &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  // Check if a day is in the past
  const isPast = (dayNum: number) => {
    const checkDate = new Date(year, month, dayNum);
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return checkDate < startOfToday;
  };

  return (
    <div className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 shadow-2xl select-none text-stone-900 dark:text-stone-100">
      {/* Month & Year Navigation Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-stone-600 dark:text-stone-300"
          aria-label="Previous Month"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="font-serif-luxury text-sm font-semibold tracking-wide text-stone-900 dark:text-stone-100">
          {monthNames[month]} {year}
        </span>

        <button
          type="button"
          onClick={handleNextMonth}
          className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-stone-600 dark:text-stone-300"
          aria-label="Next Month"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {daysOfWeek.map((day) => (
          <span
            key={day}
            className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500"
          >
            {day}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {/* Previous Month Padding Days */}
        {Array.from({ length: firstDayIndex }).map((_, idx) => (
          <span
            key={`prev-${idx}`}
            className="h-8 flex items-center justify-center text-xs text-stone-300 dark:text-stone-700 pointer-events-none"
          >
            {daysInPrevMonth - firstDayIndex + idx + 1}
          </span>
        ))}

        {/* Current Month Days */}
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const dayNum = idx + 1;
          const selected = isSelected(dayNum);
          const todayDay = isToday(dayNum);
          const past = isPast(dayNum);

          return (
            <button
              key={`day-${dayNum}`}
              type="button"
              disabled={past}
              onClick={() => handleSelectDay(dayNum)}
              className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                selected
                  ? 'bg-[#C5A880] text-white font-bold shadow-md scale-105'
                  : todayDay
                  ? 'border border-[#C5A880] text-[#C5A880] font-bold hover:bg-[#C5A880]/10'
                  : past
                  ? 'text-stone-300 dark:text-stone-700 cursor-not-allowed line-through'
                  : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200'
              }`}
            >
              {dayNum}
            </button>
          );
        })}
      </div>
    </div>
  );
};
