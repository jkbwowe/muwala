"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useHydratedAssessment } from "@/app/store/useHydratedStore";

// ============================================================================
// SVG ICONS
// ============================================================================
const HeartBubbleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path d="M12 14c-1.8-1.5-3-2.6-3-4a2 2 0 1 1 4 0 2 2 0 1 1 4 0c0 1.4-1.2 2.5-3 4-1 .8-2 1.3-2 1.3s-1-.5-2-1.3z" fill="currentColor" stroke="none" />
  </svg>
);

const BubbleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const LeafIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const FinishArrowIcon = ({ className }: { className?: string }) => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16l4-4-4-4" />
    <path d="M8 12h8" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
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
    <polyline points="20 6 9 17 4 12" />
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

// ============================================================================
// PAGE COMPONENT
// ============================================================================
export default function QuestionnairePage5() {
  const router = useRouter();

  // --- Global Store State ---
  const { answers, setAnswer, isHydrated } = useHydratedAssessment();

  // Developer Note: qn20 answers both qn20 and qn36. qn36 is hidden.
  const qn20 = answers["qn20"] || "";
  const qn21 = answers["qn21"] || "";
  const qn55 = answers["qn55"] || "";
  const qn56 = answers["qn56"] || "";
  const qn57 = answers["qn57"] || "";
  const qn58 = answers["qn58"] || "";

  // --- State for UI ---
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [progressWidth, setProgressWidth] = useState<string>("66.6%");

  // Scroll to top and animate progress bar on mount (66.6% -> 83.3%)
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setProgressWidth("83.3%");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Validation logic: All 6 visible questions answered
  const isNextEnabled =
    qn20 !== "" &&
    qn21 !== "" &&
    qn55 !== "" &&
    qn56 !== "" &&
    qn57 !== "" &&
    qn58 !== "";

  // --- Options Data ---
  const optionsOften = ["Very often", "Often", "Sometimes", "Rarely", "Never"];
  const optionsFriends = ["Yes, regularly", "Yes, occasionally", "Rarely", "No, never"];
  const optionsAware = ["Very aware", "Aware", "Somewhat aware", "Not very aware", "Not aware at all"];
  const optionsAccess = [
    "Yes, regularly provided",
    "Yes, but limited access",
    "No, not provided",
    "I am not sure",
  ];

  // --- Helper: Render Chips ---
  const renderChips = (
    options: string[],
    currentValue: string,
    questionKey: string,
    cardNumber: number,
    theme: "blue" | "green"
  ) => {
    const isBlue = theme === "blue";

    return (
      <div className="flex flex-wrap gap-x-2 gap-y-3 mt-2" role="radiogroup">
        {options.map((option) => {
          const isSelected = currentValue === option;

          // Dynamic colors based on theme and selection
          const selectedBg = isBlue ? "bg-[#D6F0F8]" : "bg-[#E8F8F2]";
          const selectedBorder = isBlue ? "border-[#1B9DC8]" : "border-[#2EAF7D]";
          const selectedText = isBlue ? "text-[#126E8E]" : "text-[#1B704C]"; // Darker green for text
          const checkColor = isBlue ? "text-[#1B9DC8]" : "text-[#2EAF7D]";

          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => {
                setAnswer(questionKey, option);
                setActiveCard(cardNumber);
              }}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-[24px] border-[1.5px] transition-all duration-150 cursor-pointer
                ${
                  isSelected
                    ? `${selectedBg} ${selectedBorder} ${selectedText}`
                    : "bg-white border-[#DDE4EA] text-[#5A6473] hover:bg-[#F4F8FB] hover:border-[#1B9DC8]"
                }
              `}
            >
              {isSelected && <CheckIcon className={checkColor} />}
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
    );
  };

  // --- Helper: Render Radio List (Green Variant for Group B) ---
  const renderRadioListGreen = (
    options: string[],
    currentValue: string,
    questionKey: string,
    cardNumber: number
  ) => {
    return (
      <div className="flex flex-col gap-2 mt-2 w-full" role="radiogroup">
        {options.map((option) => {
          const isSelected = currentValue === option;

          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => {
                setAnswer(questionKey, option);
                setActiveCard(cardNumber);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3.5 rounded-[10px] text-left transition-all duration-150 cursor-pointer
                ${
                  isSelected
                    ? "bg-[#F0FBF6] border-[1.5px] border-[#2EAF7D]"
                    : "bg-white border border-[#DDE4EA] hover:bg-[#F9FBFC] hover:border-[#2EAF7D]"
                }
              `}
            >
              {/* Radio Circle */}
              <div
                className={`
                  w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors duration-150
                  ${
                    isSelected
                      ? "border-2 border-[#2EAF7D] bg-white"
                      : "border-2 border-[#DDE4EA] bg-white"
                  }
                `}
              >
                {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#2EAF7D]" />}
              </div>

              {/* Option Text */}
              <span className="font-normal text-[15px] text-[#1A1A2E] leading-snug">
                {option}
              </span>
            </button>
          );
        })}
      </div>
    );
  };

  const handleNext = () => {
    //logic
    router.push('/assessment/your-future-and-coping')
  }

  // Prevent hydration errors
  if (!isHydrated) return null;

  return (
    <main className="min-h-screen bg-[#F4F8FB] font-sans selection:bg-[#1B9DC8] selection:text-white flex flex-col pb-[140px]">
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
            <span className="font-medium text-[13px] text-[#5A6473]">Step 5 of 6</span>
            <span className="font-semibold text-[14px] text-[#1B9DC8]">
              Health Discussions & Menstrual Health
            </span>
          </div>
          <div className="w-full h-[6px] bg-[#DDE4EA] rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-[#1B9DC8] rounded-full transition-all duration-500 ease-in-out"
              style={{ width: progressWidth }}
            ></div>
          </div>
          <div className="text-right font-normal text-[12px] text-[#5A6473]">
            6 questions
          </div>
        </div>
      </section>

      {/* 3. PAGE HEADER */}
      <section className="w-full bg-white px-5 md:px-6 pt-8 pb-5 rounded-b-[24px] shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
        <div className="max-w-[680px] mx-auto flex flex-col items-center text-center">
          <div className="w-[56px] h-[56px] rounded-full bg-[#D6F0F8] flex items-center justify-center mb-4 shrink-0">
            <HeartBubbleIcon className="text-[#1B9DC8]" />
          </div>
          <h1 className="font-bold text-[22px] md:text-[28px] text-[#1A1A2E] mb-2 leading-tight">
            Health Discussions
          </h1>
          <p className="font-normal text-[16px] text-[#5A6473] max-w-[440px] leading-[1.6]">
            How openly do you talk about health topics — and what do you know about your
            own body?
          </p>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="w-full px-4 md:px-6 pt-6 md:pt-8 flex-grow flex flex-col pb-8">
        <div className="max-w-[680px] mx-auto w-full flex flex-col gap-4">
          
          {/* ==============================================================
              4. GROUP A — HEALTH DISCUSSIONS
             ============================================================== */}
          <div className="flex w-full mb-1">
            <div className="bg-[#D6F0F8] text-[#1B9DC8] px-[14px] py-[6px] rounded-[6px] flex items-center gap-2">
              <BubbleIcon className="text-[#1B9DC8]" />
              <span className="font-bold text-[11px] uppercase tracking-[0.06em]">
                Health Discussions
              </span>
            </div>
          </div>

          {/* Q1 (qn20 & silently qn36) */}
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
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4 leading-snug">
              How often do you discuss sexual health and contraception with a healthcare provider or a trusted adult?
            </h2>
            {renderChips(optionsOften, qn20, "qn20", 1, "blue")}
          </div>

          {/* Q2 (qn21) */}
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
              Do you discuss sexual health and contraception with your friends and peers?
            </h2>
            {renderChips(optionsFriends, qn21, "qn21", 2, "blue")}
          </div>

          {/* ==============================================================
              5. GROUP DIVIDER
             ============================================================== */}
          <div className="relative flex py-4 md:py-6 items-center w-full my-2">
            <div className="flex-grow border-t border-[#DDE4EA]"></div>
            <span className="shrink-0 px-3 text-[#5A6473] text-[13px] font-medium bg-[#F4F8FB]">
              Menstrual Health
            </span>
            <div className="flex-grow border-t border-[#DDE4EA]"></div>
          </div>

          {/* ==============================================================
              6. GROUP B — MENSTRUAL HEALTH
             ============================================================== */}
          <div className="flex w-full mb-1">
            <div className="bg-[#E8F8F2] text-[#2EAF7D] px-[14px] py-[6px] rounded-[6px] flex items-center gap-2">
              <LeafIcon className="text-[#2EAF7D]" />
              <span className="font-bold text-[11px] uppercase tracking-[0.06em]">
                Menstrual Health Awareness
              </span>
            </div>
          </div>

          {/* Q3 (qn55) */}
          <div
            onClick={() => setActiveCard(3)}
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default ${
              activeCard === 3
                ? "border-[1.5px] border-[#2EAF7D] shadow-[0_0_0_4px_rgba(46,175,125,0.12)]"
                : "border border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
            }`}
          >
            <div className="flex items-center mb-3">
              <span className="bg-[#E8F8F2] text-[#2EAF7D] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">
                Q3
              </span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4 leading-snug">
              Are you aware of your reproductive health and menstrual cycle?
            </h2>
            {renderChips(optionsAware, qn55, "qn55", 3, "green")}
          </div>

          {/* Q4 (qn56) */}
          <div
            onClick={() => setActiveCard(4)}
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default ${
              activeCard === 4
                ? "border-[1.5px] border-[#2EAF7D] shadow-[0_0_0_4px_rgba(46,175,125,0.12)]"
                : "border border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
            }`}
          >
            <div className="flex items-center mb-3">
              <span className="bg-[#E8F8F2] text-[#2EAF7D] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">
                Q4
              </span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4 leading-snug">
              How often do you discuss menstrual health management with a healthcare provider or a trusted adult?
            </h2>
            {renderChips(optionsOften, qn56, "qn56", 4, "green")}
          </div>

          {/* Q5 (qn57) */}
          <div
            onClick={() => setActiveCard(5)}
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default ${
              activeCard === 5
                ? "border-[1.5px] border-[#2EAF7D] shadow-[0_0_0_4px_rgba(46,175,125,0.12)]"
                : "border border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
            }`}
          >
            <div className="flex items-center mb-3">
              <span className="bg-[#E8F8F2] text-[#2EAF7D] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">
                Q5
              </span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4 leading-snug">
              Do you discuss menstrual health management with your friends and peers?
            </h2>
            {renderChips(optionsFriends, qn57, "qn57", 5, "green")}
          </div>

          {/* Q6 (qn58) */}
          <div
            onClick={() => setActiveCard(6)}
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default ${
              activeCard === 6
                ? "border-[1.5px] border-[#2EAF7D] shadow-[0_0_0_4px_rgba(46,175,125,0.12)]"
                : "border border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
            }`}
          >
            <div className="flex items-center mb-3">
              <span className="bg-[#E8F8F2] text-[#2EAF7D] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">
                Q6
              </span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4 leading-snug">
              Does your community or school provide access to information on menstrual health management?
            </h2>
            {renderRadioListGreen(optionsAccess, qn58, "qn58", 6)}
          </div>

          {/* ==============================================================
              7. FINAL PUSH STRIP
             ============================================================== */}
          <div className="w-full mt-4 bg-gradient-to-br from-[#D6F0F8] to-[#E8F8F2] border border-[#A8DFC8] rounded-[12px] p-[14px_18px] flex flex-col sm:flex-row items-start sm:items-center gap-3 shadow-sm">
            <div className="bg-white/60 p-2 rounded-full shrink-0">
              <FinishArrowIcon className="text-[#1B9DC8]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[13px] text-[#1A1A2E]">
                One section left!
              </span>
              <span className="font-normal text-[12px] text-[#5A6473]">
                You are almost done with your assessment.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          FIXED BOTTOM SECTION
         ============================================================== */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col">
        {/* 9. PRIVACY REMINDER STRIP */}
        <div className="w-full bg-[#D6F0F8] py-2.5 px-6 flex justify-center items-center gap-2">
          <LockIcon className="text-[#126E8E]" />
          <span className="font-normal text-[12px] text-[#126E8E] text-center">
            Your answers are completely private and stored only on this device.
          </span>
        </div>

        {/* 8. BOTTOM NAVIGATION BAR */}
        <div className="w-full bg-white h-[72px] px-6 border-t border-[#DDE4EA] shadow-[0_-2px_12px_rgba(0,0,0,0.06)] flex items-center justify-between">
          <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between">
            {/* Back Button */}
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[#5A6473] hover:text-[#1A1A2E] transition-colors font-medium text-[15px] min-h-[44px] px-2 -ml-2 cursor-pointer"
            >
              <ArrowLeftIcon />
              <span>Back</span>
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#2EAF7D]"></div> {/* Step 1 */}
              <div className="w-2 h-2 rounded-full bg-[#2EAF7D]"></div> {/* Step 2 */}
              <div className="w-2 h-2 rounded-full bg-[#2EAF7D]"></div> {/* Step 3 */}
              <div className="w-2 h-2 rounded-full bg-[#2EAF7D]"></div> {/* Step 4 */}
              <div className="w-5 h-2 rounded-full bg-[#1B9DC8]"></div> {/* Step 5: Active */}
              <div className="w-2 h-2 rounded-full bg-[#DDE4EA]"></div> {/* Step 6 */}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              type="button"
              disabled={!isNextEnabled}
              className={`
                flex items-center gap-2 font-semibold text-[15px] px-7 py-3 rounded-[10px] min-h-[44px] transition-all duration-200
                ${
                  isNextEnabled
                    ? "bg-[#1B9DC8] hover:bg-[#126E8E] text-white cursor-pointer shadow-sm"
                    : "bg-[#DDE4EA] text-[#5A6473] cursor-not-allowed"
                }
              `}
            >
              <span>Next</span>
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}