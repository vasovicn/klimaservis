"use client";

interface BookingBlockProps {
  booking: {
    id: string;
    customerName: string;
    customerPhone: string;
    services: string;
    startTime: string;
    endTime: string;
    status: string;
    duration: number;
  };
  rowHeight: number;
  onClick?: () => void;
}

function timeToSlotCount(startTime: string, endTime: string): number {
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  const startMin = sh * 60 + sm;
  const endMin = eh * 60 + em;
  return Math.max(Math.round((endMin - startMin) / 30), 1);
}

const statusColors: Record<string, string> = {
  confirmed: "bg-brand-500 border-brand-600 text-white",
  completed: "bg-green-500 border-green-600 text-white",
};

export default function BookingBlock({ booking, rowHeight, onClick }: BookingBlockProps) {
  const span = timeToSlotCount(booking.startTime, booking.endTime);

  let serviceNames: string;
  try {
    const ids = JSON.parse(booking.services) as string[];
    const nameMap: Record<string, string> = {
      mali: "Mali servis",
      veliki: "Veliki servis",
      kondenzator: "Kondenzator",
      ostalo: "Ostalo",
    };
    serviceNames = ids.map((id) => nameMap[id] || id).join(", ");
  } catch {
    serviceNames = booking.services;
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={`absolute inset-x-1 top-0 cursor-pointer overflow-hidden rounded-lg border px-2 py-1 text-xs shadow-sm transition-opacity hover:opacity-90 ${
        statusColors[booking.status] || statusColors.confirmed
      }`}
      style={{
        height: `${span * rowHeight}px`,
        zIndex: 10,
      }}
    >
      <div className="font-semibold truncate">{booking.customerName}</div>
      <div className="truncate opacity-80">{serviceNames}</div>
      <div className="opacity-80">
        {booking.startTime} - {booking.endTime}
      </div>
    </div>
  );
}
