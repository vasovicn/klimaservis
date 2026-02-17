"use client";

const DAYS_SERBIAN = ["Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub"];
const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "Maj", "Jun",
  "Jul", "Avg", "Sep", "Okt", "Nov", "Dec",
];

function formatDateStr(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isToday(d: Date) {
  const t = new Date();
  return (
    d.getFullYear() === t.getFullYear() &&
    d.getMonth() === t.getMonth() &&
    d.getDate() === t.getDate()
  );
}

export default function DateCarousel({
  selectedDate,
  onSelect,
}: {
  selectedDate: string;
  onSelect: (date: string) => void;
}) {
  const today = new Date();
  const selectedDateObj = new Date(selectedDate + "T00:00:00");

  // Show 7 days centered on selection, but start from today or earlier
  const startOffset = Math.floor(
    (selectedDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  const baseOffset = Math.max(0, startOffset - 3);

  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + baseOffset + i);
    dates.push(d);
  }

  const goBack = () => {
    const d = new Date(selectedDateObj);
    d.setDate(d.getDate() - 1);
    if (d >= today) onSelect(formatDateStr(d));
  };

  const goForward = () => {
    const d = new Date(selectedDateObj);
    d.setDate(d.getDate() + 1);
    onSelect(formatDateStr(d));
  };

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <button
        onClick={goBack}
        className="shrink-0 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 sm:p-2"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto sm:gap-2">
        {dates.map((d) => {
          const dateStr = formatDateStr(d);
          const selected = dateStr === selectedDate;
          const todayClass = isToday(d);

          return (
            <button
              key={dateStr}
              onClick={() => onSelect(dateStr)}
              className={`flex min-w-[3.5rem] flex-1 flex-col items-center rounded-xl px-1.5 py-1.5 text-sm transition-all sm:min-w-[4.5rem] sm:px-3 sm:py-2 ${
                selected
                  ? "bg-brand-500 text-white shadow-md"
                  : todayClass
                    ? "border-2 border-brand-500 bg-white text-brand-600"
                    : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="text-xs font-medium">
                {DAYS_SERBIAN[d.getDay()]}
              </span>
              <span className="text-base font-bold sm:text-lg">{d.getDate()}</span>
              <span className="text-xs">{MONTHS_SHORT[d.getMonth()]}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={goForward}
        className="shrink-0 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 sm:p-2"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
