"use client";

import React, { useState, useEffect } from "react";

// ============================================================================
// SVG ICONS
// ============================================================================
const SparkleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3v18" />
    <path d="M3 12h18" />
    <path d="M5.636 5.636l12.728 12.728" />
    <path d="M18.364 5.636L5.636 18.364" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const InfoIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const LockIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const SpinnerIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

// Completion Card Icons
const GraduationIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const HealthCrossIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 12h-4v4h-4v-4H8v-4h4V4h4v4h4v4z" />
  </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

// ============================================================================
// PAGE COMPONENT
// ============================================================================
export default function QuestionnairePage6() {
  // --- State for Answers ---
  const [qn22, setQn22] = useState<string[]>([]); // Multi-select
  const [qn64, setQn64] = useState<string>("");
  const [qn68, setQn68] = useState<string>("");

  // --- State for UI ---
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [progressWidth, setProgressWidth] = useState<string>("83.3%");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Scroll to top and animate progress bar on mount (83.3% -> 99%)
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setProgressWidth("99%");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Validation logic: All 3 questions answered
  const isAllAnswered = qn22.length > 0 && qn64 !== "" && qn68 !== "";

  // Handle Form Submission
  const handleSubmit = () => {
    if (!isAllAnswered || isSubmitting) return;
    setIsSubmitting(true);
    
    // Simulate API call and model payload construction
    // Dev note: qn22 answer string would be: qn22.join(" ")
    setTimeout(() => {
      // Mock navigation to results page
      console.log("Navigating to Results...");
      setIsSubmitting(false);
    }, 1800);
  };

  // --- Options Data ---
  const optionsEntertainment = [
    "Social media",
    "Watch TV",
    "Read newspapers and magazines",
    "Read books",
    "Share and listen to stories",
    "Other",
  ];
  const optionsAware = [
    "Very aware",
    "Aware",
    "Somewhat aware",
    "Not very aware",
    "Not aware at all",
  ];
  const optionsFuture = [
    "Very positively — I make careful choices",
    "Mostly positively — I try my best",
    "I am not sure yet",
    "I worry they may impact me negatively",
    "I have not thought about this much",
  ];

  // --- Helpers ---
  const toggleMultiSelect = (option: string) => {
    setQn22((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      } else {
        return [...prev, option];
      }
    });
    setActiveCard(1);
  };

  return (
    <main className="min-h-screen bg-[#F4F8FB] font-sans selection:bg-[#1B9DC8] selection:text-white flex flex-col pb-[160px]">
      {/* 1. TOP NAVIGATION BAR */}
      <nav className="w-full bg-white border-b border-[#DDE4EA] h-[56px] md:h-[64px] flex items-center px-6 sticky top-0 z-40">
        <div className="max-w-[1200px] mx-auto w-full flex justify-between items-center">
          <div className="flex flex-col w-[120px] cursor-pointer">
            <span className="text-[#1B9DC8] font-bold text-lg leading-none">HSH</span>
            <span className="text-[#1A1A2E] text-[10px] mt-[2px] leading-tight">
              Hope Springs Health
            </span>
          </div>
          <button className="border border-[#E05C3A] text-[#E05C3A] hover:bg-[#E05C3A]/5 transition-colors rounded-lg px-4 min-h-[44px] flex items-center justify-center text-sm font-medium cursor-pointer">
            Save & Exit
          </button>
        </div>
      </nav>

      {/* 2. PROGRESS BAR */}
      <section className="w-full bg-white px-6 py-4 border-b border-[#DDE4EA]">
        <div className="max-w-[680px] mx-auto w-full">
          <div className="flex justify-between items-end mb-2">
            <span className="font-medium text-[13px] text-[#2EAF7D]">
              Step 6 of 6 — Final Step
            </span>
            <span className="font-semibold text-[14px] text-[#1B9DC8]">
              Your Future & Coping
            </span>
          </div>
          <div className="w-full h-[6px] bg-[#DDE4EA] rounded-full overflow-hidden mb-2 relative">
            <div
              className="h-full rounded-full transition-all duration-700 ease-in-out bg-gradient-to-r from-[#1B9DC8] to-[#2EAF7D]"
              style={{ width: progressWidth }}
            ></div>
          </div>
          <div className="text-right font-normal text-[12px] text-[#2EAF7D]">
            Last 3 questions
          </div>
        </div>
      </section>

      {/* 3. CELEBRATION HEADER */}
      <section className="w-full bg-gradient-to-br from-[#1B9DC8] to-[#2EAF7D] px-5 py-8 md:px-6 md:py-10 relative overflow-hidden">
        {/* Subtle Confetti/Dot overlay */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none mix-blend-screen"
          style={{
            backgroundImage: "radial-gradient(circle at 10px 10px, white 2px, transparent 2px), radial-gradient(circle at 40px 40px, white 1.5px, transparent 1.5px), radial-gradient(circle at 80px 20px, white 2px, transparent 2px)",
            backgroundSize: "100px 100px"
          }}
        ></div>
        
        <div className="max-w-[560px] mx-auto flex flex-col items-center text-center relative z-10">
          <div className="w-[64px] h-[64px] rounded-full bg-white/20 flex items-center justify-center mb-4 shrink-0">
            <SparkleIcon className="text-white" />
          </div>
          <h1 className="font-bold text-[24px] md:text-[30px] text-white mb-4 leading-tight">
            Almost done!
          </h1>
          <p className="font-normal text-[16px] text-white/90 max-w-[400px] leading-[1.6]">
            These last 3 questions are about your aspirations and how you cope with challenges.
          </p>
        </div>
      </section>

      {/* 4. QUESTIONS AREA */}
      <section className="w-full px-4 md:px-6 pt-6 md:pt-8 flex-grow flex flex-col">
        <div className="max-w-[680px] mx-auto w-full flex flex-col gap-4">

          {/* QUESTION CARD 1 — qn22 (Multi-select) */}
          <div
            onClick={() => setActiveCard(1)}
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default ${
              activeCard === 1
                ? "border-[1.5px] border-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]"
                : "border border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
            }`}
          >
            <div className="flex items-center mb-3">
              <span className="bg-[#D6F0F8] text-[#1B9DC8] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">
                Q1
              </span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-3 leading-snug">
              What are some of your favorite ways to stay informed or entertained in your free time?
            </h2>
            <p className="font-normal text-[13px] text-[#5A6473] italic mb-[10px]">
              Select all that apply
            </p>
            
            <div className="flex flex-wrap gap-x-2 gap-y-3">
              {optionsEntertainment.map((option) => {
                const isSelected = qn22.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleMultiSelect(option)}
                    className={`
                      flex items-center gap-2 px-5 py-2.5 rounded-[24px] border-[1.5px] transition-all duration-150 cursor-pointer
                      ${
                        isSelected
                          ? "bg-[#D6F0F8] border-[#1B9DC8] text-[#126E8E]"
                          : "bg-white border-[#DDE4EA] text-[#5A6473] hover:bg-[#F4F8FB] hover:border-[#1B9DC8]"
                      }
                    `}
                  >
                    {isSelected && <CheckIcon className="text-[#1B9DC8]" />}
                    <span
                      className={
                        isSelected ? "font-semibold text-[14px]" : "font-medium text-[14px]"
                      }
                    >
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* QUESTION CARD 2 — qn64 (Single-select) */}
          <div
            onClick={() => setActiveCard(2)}
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default ${
              activeCard === 2
                ? "border-[1.5px] border-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]"
                : "border border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
            }`}
          >
            <div className="flex items-center mb-3">
              <span className="bg-[#D6F0F8] text-[#1B9DC8] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">
                Q2
              </span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4 leading-snug">
              Are you aware of healthy coping mechanisms?
            </h2>
            
            <div className="flex flex-wrap gap-x-2 gap-y-3">
              {optionsAware.map((option) => {
                const isSelected = qn64 === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setQn64(option);
                      setActiveCard(2);
                    }}
                    className={`
                      flex items-center gap-2 px-5 py-2.5 rounded-[24px] border-[1.5px] transition-all duration-150 cursor-pointer
                      ${
                        isSelected
                          ? "bg-[#D6F0F8] border-[#1B9DC8] text-[#126E8E]"
                          : "bg-white border-[#DDE4EA] text-[#5A6473] hover:bg-[#F4F8FB] hover:border-[#1B9DC8]"
                      }
                    `}
                  >
                    {isSelected && <CheckIcon className="text-[#1B9DC8]" />}
                    <span
                      className={
                        isSelected ? "font-semibold text-[14px]" : "font-medium text-[14px]"
                      }
                    >
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Soft educational nudge */}
            <div className="flex items-start gap-2 mt-4 max-w-[420px]">
              <InfoIcon className="text-[#2EAF7D] shrink-0 mt-[2px]" />
              <p className="font-normal text-[12px] text-[#5A6473] leading-relaxed">
                Healthy coping includes talking to trusted people, exercise, creative outlets, and rest.
              </p>
            </div>
          </div>

          {/* QUESTION CARD 3 — qn68 (Final Question - Radio List) */}
          <div
            onClick={() => setActiveCard(3)}
            className="w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default border-[1.5px] border-[#1B9DC8] shadow-[0_4px_16px_rgba(27,157,200,0.12)]"
          >
            <div className="font-medium text-[11px] text-[#2EAF7D] mb-1.5 uppercase tracking-wide">
              Final question
            </div>
            <div className="flex items-center mb-3">
              <span className="bg-[#D6F0F8] text-[#1B9DC8] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">
                Q3
              </span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4 leading-snug">
              How do you think your current choices and relationships may impact your future goals?
            </h2>
            
            <div className="flex flex-col gap-2 mt-2 w-full">
              {optionsFuture.map((option) => {
                const isSelected = qn68 === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setQn68(option);
                      setActiveCard(3);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3.5 rounded-[10px] text-left transition-all duration-150 cursor-pointer
                      ${
                        isSelected
                          ? "bg-[#F4F9FF] border-[1.5px] border-[#1B9DC8]"
                          : "bg-white border border-[#DDE4EA] hover:bg-[#F9FBFC] hover:border-[#1B9DC8]"
                      }
                    `}
                  >
                    <div
                      className={`
                        w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors duration-150
                        ${
                          isSelected
                            ? "border-2 border-[#1B9DC8] bg-white"
                            : "border-2 border-[#DDE4EA] bg-white"
                        }
                      `}
                    >
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#1B9DC8]" />}
                    </div>
                    <span className="font-normal text-[15px] text-[#1A1A2E] leading-snug">
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. COMPLETION CARD */}
          <div className="w-full bg-white border-[1.5px] border-[#2EAF7D] rounded-[16px] p-6 md:p-7 shadow-[0_4px_20px_rgba(46,175,125,0.12)] mt-4">
            <div className="flex justify-center gap-3 mb-4">
              <div className="w-[40px] h-[40px] rounded-full bg-[#D6F0F8] flex items-center justify-center text-[#1B9DC8]">
                <GraduationIcon />
              </div>
              <div className="w-[40px] h-[40px] rounded-full bg-[#E8F8F2] flex items-center justify-center text-[#2EAF7D]">
                <HealthCrossIcon />
              </div>
              <div className="w-[40px] h-[40px] rounded-full bg-[#D6F0F8] flex items-center justify-center text-[#1B9DC8]">
                <ShieldIcon />
              </div>
            </div>
            
            <div className="text-center mb-5">
              <h3 className="font-semibold text-[15px] text-[#1A1A2E]">
                Your report covers 3 risk areas:
              </h3>
              <p className="font-normal text-[14px] text-[#5A6473] mt-1.5">
                School dropout · Pregnancy · Older individual exposure
              </p>
              <p className="font-normal text-[13px] text-[#5A6473] mt-2">
                Results are generated instantly and privately on your device.
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!isAllAnswered || isSubmitting}
              className={`
                w-full flex items-center justify-center gap-2 py-[18px] rounded-[12px] font-bold text-[17px] transition-all duration-200
                ${
                  !isAllAnswered
                    ? "bg-[#DDE4EA] text-[#5A6473] cursor-not-allowed"
                    : "bg-gradient-to-br from-[#1B9DC8] to-[#2EAF7D] text-white hover:-translate-y-[1px] hover:shadow-[0_6px_24px_rgba(27,157,200,0.40)] shadow-[0_4px_16px_rgba(27,157,200,0.30)] cursor-pointer"
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <SpinnerIcon className="animate-spin text-white" />
                  <span className="font-medium text-[16px]">Generating your report...</span>
                </>
              ) : (
                <span>See My Results →</span>
              )}
            </button>

            <div className="flex justify-center items-center gap-1.5 mt-3">
              <LockIcon className="text-[#2EAF7D]" />
              <span className="font-normal text-[12px] text-[#5A6473]">
                No data leaves your device. Ever.
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ==============================================================
          FIXED BOTTOM SECTION
         ============================================================== */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col">
        {/* 7. PRIVACY REMINDER STRIP */}
        <div className="w-full bg-[#D6F0F8] py-2.5 px-6 flex justify-center items-center gap-2">
          <LockIcon className="text-[#126E8E]" />
          <span className="font-normal text-[12px] text-[#126E8E] text-center">
            Your answers are completely private and stored only on this device.
          </span>
        </div>

        {/* 6. BOTTOM NAVIGATION BAR */}
        <div className="w-full bg-white h-[72px] px-6 border-t border-[#DDE4EA] shadow-[0_-2px_12px_rgba(0,0,0,0.06)] flex items-center justify-between">
          <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between">
            {/* Back Button */}
            <button
              type="button"
              className="flex items-center gap-2 text-[#5A6473] hover:text-[#1A1A2E] transition-colors font-medium text-[15px] min-h-[44px] px-2 -ml-2 cursor-pointer"
            >
              <ArrowLeftIcon />
              <span>Back</span>
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#2EAF7D]"></div>
              <div className="w-2 h-2 rounded-full bg-[#2EAF7D]"></div>
              <div className="w-2 h-2 rounded-full bg-[#2EAF7D]"></div>
              <div className="w-2 h-2 rounded-full bg-[#2EAF7D]"></div>
              <div className="w-2 h-2 rounded-full bg-[#2EAF7D]"></div>
              <div className="w-5 h-2 rounded-full bg-[#2EAF7D]"></div> {/* Step 6: Active (Green) */}
            </div>

            {/* See Results Button (Replaces Next) */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isAllAnswered || isSubmitting}
              className={`
                flex items-center gap-2 font-semibold text-[15px] px-5 py-3 rounded-[10px] min-h-[44px] transition-all duration-200
                ${
                  !isAllAnswered
                    ? "bg-[#DDE4EA] text-[#5A6473] cursor-not-allowed"
                    : "bg-gradient-to-r from-[#1B9DC8] to-[#2EAF7D] text-white hover:opacity-90 cursor-pointer shadow-sm"
                }
              `}
            >
              <span>{isSubmitting ? "Loading..." : "See Results →"}</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}