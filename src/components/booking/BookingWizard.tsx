"use client";

import { useState } from "react";
import StepDiagnosis from "./StepDiagnosis";
import StepSolutions from "./StepSolutions";
import StepDate from "./StepDate";
import StepTime from "./StepTime";
import StepContact from "./StepContact";
import StepSuccess from "./StepSuccess";

export interface BookingData {
  problems: string[];
  services: string[];
  date: string;
  startTime: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
}

// wizard step → progress circle index (0-based)
// steps 0-1 (Diagnosis + Solutions) both map to progress circle 0
function stepToProgress(step: number): number {
  if (step <= 1) return 0;
  return step - 1;
}

const PROGRESS_LABELS = ["Dijagnoza", "Datum", "Termin", "Podaci"];

export default function BookingWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookingData>({
    problems: [],
    services: [],
    date: "",
    startTime: "",
    customerName: "",
    customerPhone: "",
    customerAddress: "",
  });

  const update = (partial: Partial<BookingData>) =>
    setData((prev) => ({ ...prev, ...partial }));

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);
  const goToStep = (s: number) => setStep(s);
  const reset = () => {
    setStep(0);
    setData({
      problems: [],
      services: [],
      date: "",
      startTime: "",
      customerName: "",
      customerPhone: "",
      customerAddress: "",
    });
  };

  const progressIndex = stepToProgress(step);
  const showProgress = step < 5;

  return (
    <div className="p-6">
      {/* Progress indicator */}
      {showProgress && (
        <div className="mb-6">
          <div className="flex items-center justify-between">
            {PROGRESS_LABELS.map((label, i) => (
              <div key={label} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                      i <= progressIndex
                        ? "bg-brand-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className="mt-1 text-xs text-gray-500 hidden sm:block">
                    {label}
                  </span>
                </div>
                {i < PROGRESS_LABELS.length - 1 && (
                  <div
                    className={`mx-2 h-0.5 flex-1 transition-colors ${
                      i < progressIndex ? "bg-brand-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back button */}
      {step > 0 && step < 5 && (
        <button
          onClick={back}
          className="mb-4 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Nazad
        </button>
      )}

      {/* Steps */}
      {step === 0 && (
        <StepDiagnosis data={data} update={update} next={next} />
      )}
      {step === 1 && (
        <StepSolutions data={data} next={next} />
      )}
      {step === 2 && <StepDate data={data} update={update} next={next} />}
      {step === 3 && <StepTime data={data} update={update} next={next} />}
      {step === 4 && (
        <StepContact data={data} update={update} next={next} goToStep={goToStep} />
      )}
      {step === 5 && <StepSuccess data={data} reset={reset} />}
    </div>
  );
}
