"use client";

import { useState } from "react";
import type { BookingData } from "./BookingWizard";
import ServiceChat from "./ServiceChat";

export const PROBLEMS = [
  { id: "redovan", label: "Redovan godišnji servis", services: ["redovan"] },
  { id: "slabo_hladi", label: "Klima slabo hladi", services: ["dubinski", "freon", "popravka"] },
  { id: "slab_protok", label: "Slab protok vazduha", services: ["dubinski"] },
  { id: "curanje_vode", label: "Curanje vode iz unutrašnje jedinice", services: ["dubinski"] },
  { id: "led", label: "Led na unutrašnjoj ili spoljašnjoj jedinici", services: ["freon"] },
  { id: "zvukovi", label: "Neobični zvukovi", services: ["popravka"] },
  { id: "miris", label: "Neprijatan miris", services: ["dubinski"] },
  { id: "sama_gasi_pali", label: "Klima se sama gasi ili pali", services: ["popravka"] },
  { id: "potrosnja_struje", label: "Velika potrošnja struje", services: ["popravka"] },
  { id: "ostalo", label: "Ostalo", services: [] },
] as const;

export function collectServices(problemIds: string[]): string[] {
  const set = new Set<string>();
  for (const pid of problemIds) {
    const p = PROBLEMS.find((x) => x.id === pid);
    if (p) p.services.forEach((s) => set.add(s));
  }
  return Array.from(set);
}

export default function StepDiagnosis({
  data,
  update,
  next,
}: {
  data: BookingData;
  update: (d: Partial<BookingData>) => void;
  next: () => void;
}) {
  const [showChat, setShowChat] = useState(false);

  const toggle = (id: string) => {
    const problems = data.problems.includes(id)
      ? data.problems.filter((p) => p !== id)
      : [...data.problems, id];
    update({ problems });
  };

  const handleNext = () => {
    const onlyOstalo = data.problems.length === 1 && data.problems[0] === "ostalo";

    if (onlyOstalo) {
      update({ services: [] });
      setShowChat(true);
    } else {
      const problems = data.problems.filter((p) => p !== "ostalo");
      update({ services: collectServices(problems) });
      next();
    }
  };

  const handleServicesFound = (chatServices: string[]) => {
    const merged = Array.from(new Set([...data.services, ...chatServices]));
    update({ services: merged });
    next();
  };

  if (showChat) {
    return (
      <ServiceChat
        onServicesFound={handleServicesFound}
        onBack={() => setShowChat(false)}
      />
    );
  }

  return (
    <div>
      <h2 className="mb-1 text-xl font-bold text-gray-900">Opišite problem</h2>
      <p className="mb-4 text-sm text-gray-500">
        Izaberite jedan ili više simptoma sa kojima se suočavate
      </p>

      <div className="space-y-2">
        {PROBLEMS.map((problem, i) => {
          const selected = data.problems.includes(problem.id);
          return (
            <button
              key={problem.id}
              onClick={() => toggle(problem.id)}
              className={`w-full rounded-xl border-2 p-3.5 text-left transition-all ${
                selected
                  ? "border-brand-500 bg-brand-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-gray-900">
                  {problem.label}
                </span>
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                    selected
                      ? "border-brand-500 bg-brand-500"
                      : "border-gray-300"
                  }`}
                >
                  {selected && (
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={handleNext}
        disabled={data.problems.length === 0}
        className="mt-6 w-full rounded-full bg-brand-500 py-3 font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        Dalje
      </button>
    </div>
  );
}
