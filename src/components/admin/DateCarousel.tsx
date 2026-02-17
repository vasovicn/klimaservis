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
    <div className="flex items-center gap-2">
      <button
        onClick={goBack}
        className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="flex gap-2 overflow-x-auto">
        {dates.map((d) => {
          const dateStr = formatDateStr(d);
          const selected = dateStr === selectedDate;
          const todayClass = isToday(d);

          return (
            <button
              key={dateStr}
              onClick={() => onSelect(dateStr)}
              className={`flex min-w-[4.5rem] flex-col items-center rounded-xl px-3 py-2 text-sm transition-all ${
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
              <span className="text-lg font-bold">{d.getDate()}</span>
              <span className="text-xs">{MONTHS_SHORT[d.getMonth()]}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={goForward}
        className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
