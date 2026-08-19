"use client";

import React, { useState, useEffect } from 'react';
import { NextButton, BackButton, DisabledBackButton } from '@/app/components/NavButtons'
import { useHydratedAssessment } from '@/app/store/useHydratedStore';

// ============================================================================
// SVG ICONS
// ============================================================================
const BookOpenIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const LockIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ============================================================================
// PAGE COMPONENT
// ============================================================================
export default function QuestionnairePage3() {

  // --- Pull State from Global Store ---
  const { answers, setAnswer, isHydrated } = useHydratedAssessment();

  // Pulling answers for this page
  const qn11 = answers['qn11'] || "";
  const qn12 = answers['qn12'] || "";
  const qn13 = answers['qn13'] || "";
  const qn15 = answers['qn15'] || "";
  const qn19 = answers['qn19'] || "";

  // Dynamic logic from previous page
  const qn17 = answers['qn17'] || "";
  const showQn19 = qn17 === "No";

  // --- State for UI ---
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [progressWidth, setProgressWidth] = useState<string>("33.3%");

  // Scroll to top and animate progress bar on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setProgressWidth("50.0%");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Clear conditional answer if parent question changes
  useEffect(() => {
    if (!showQn19 && qn19 !== "") {
      setAnswer("qn19", ""); 
    }
  }, [showQn19, qn19, setAnswer]);

  // Validation logic
  const isNextEnabled = showQn19
    ? qn11 !== "" && qn12 !== "" && qn13 !== "" && qn15 !== "" && qn19 !== ""
    : qn11 !== "" && qn12 !== "" && qn13 !== "" && qn15 !== "";

  // Options Data
  const optionsQ1 = ["Very knowledgeable", "Knowledgeable", "Somewhat knowledgeable", "Not very knowledgeable", "Not knowledgeable at all"];
  const optionsQ2 = ["Yes, at school", "Yes, through other sources", "Yes, both at school and other sources", "No"];
  const optionsQ3 = ["Yes, easily accessible", "Yes, but limited", "No, not accessible", "I am not sure"];
  const optionsQ4 = ["Very aware", "Aware", "Somewhat aware", "Not very aware", "Not aware at all"];
  const optionsQ5 = ["Yes, consistently", "Yes, sometimes", "No", "Prefer not to say"];

  // Helper render for chips
  const renderChips = (
    options: string[],
    currentValue: string,
    questionKey: string,
    cardNumber: number
  ) => {
    return (
      <div className="flex flex-wrap gap-x-2 gap-y-3 mt-2">
        {options.map((option) => {
          const isSelected = currentValue === option;
          const isPreferNotToSay = option === "Prefer not to say";
          
          return (
            <button
              key={option}
              onClick={() => { setAnswer(questionKey, option); setActiveCard(cardNumber); }}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-[24px] border-[1.5px] transition-all duration-150
                ${isSelected && !isPreferNotToSay
                  ? 'bg-[#D6F0F8] border-[#1B9DC8] text-[#126E8E]' 
                  : isSelected && isPreferNotToSay
                  ? 'bg-[#F4F8FB] border-[#5A6473] text-[#5A6473]'
                  : isPreferNotToSay
                  ? 'bg-white border-dashed border-[#DDE4EA] text-[#5A6473] hover:bg-[#F4F8FB] hover:border-[#1B9DC8]'
                  : 'bg-white border-[#DDE4EA] text-[#5A6473] hover:bg-[#F4F8FB] hover:border-[#1B9DC8]'
                }
              `}
            >
              {isSelected && <CheckIcon className={isPreferNotToSay ? "text-[#5A6473]" : "text-[#1B9DC8]"} />}
              <span className={isSelected ? "font-semibold text-[14px]" : "font-medium text-[14px]"}>
                {option}
              </span>
            </button>
          );
        })}
      </div>
    );
  };


  // Prevent hydration mismatch
  if (!isHydrated) return null;

  return (
    <main className="min-h-screen bg-[#F4F8FB] font-sans selection:bg-[#1B9DC8] selection:text-white flex flex-col pb-[140px]">
      
      {/* 1. TOP NAVIGATION BAR */}
      <nav className="w-full bg-white border-b border-[#DDE4EA] h-[56px] md:h-[64px] flex items-center px-6 sticky top-0 z-40">
        <div className="max-w-[1200px] mx-auto w-full flex justify-between items-center">
          <div className="flex flex-col w-[120px] cursor-pointer">
            <span className="text-[#1B9DC8] font-bold text-lg leading-none">HSH</span>
            <span className="text-[#1A1A2E] text-[10px] mt-[2px] leading-tight">Hope Springs Health</span>
          </div>
          <button className="border border-[#E05C3A] text-[#E05C3A] hover:bg-[#E05C3A]/5 transition-colors rounded-lg px-4 min-h-[44px] flex items-center justify-center text-sm font-medium">
            Save & Exit
          </button>
        </div>
      </nav>

      {/* 2. PROGRESS BAR */}
      <section className="w-full bg-white px-6 py-4 border-b border-[#DDE4EA]">
        <div className="max-w-[680px] mx-auto w-full">
          <div className="flex justify-between items-end mb-2">
            <span className="font-medium text-[13px] text-[#5A6473]">Step 3 of 6</span>
            <span className="font-semibold text-[14px] text-[#1B9DC8]">Sexual Health Knowledge</span>
          </div>
          <div className="w-full h-[6px] bg-[#DDE4EA] rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-[#1B9DC8] rounded-full transition-all duration-300 ease-in-out"
              style={{ width: progressWidth }}
            ></div>
          </div>
          <div className="text-right font-normal text-[12px] text-[#5A6473]">
            {showQn19 ? "5 questions" : "4 questions"}
          </div>
        </div>
      </section>

      {/* 3. PAGE HEADER */}
      <section className="w-full bg-white px-5 md:px-6 pt-8 md:pt-10 pb-6 rounded-b-[24px] shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
        <div className="max-w-[680px] mx-auto flex flex-col items-center text-center">
          <div className="w-[56px] h-[56px] rounded-full bg-[#D6F0F8] flex items-center justify-center mb-4">
            <BookOpenIcon className="text-[#1B9DC8]" />
          </div>
          <h1 className="font-bold text-[22px] md:text-[28px] text-[#1A1A2E] mb-2">
            Sexual Health Knowledge
          </h1>
          <p className="font-normal text-[16px] text-[#5A6473] max-w-[400px] leading-[1.6]">
            Let's understand your awareness and access to sexual health information.
          </p>
        </div>
      </section>

      {/* 4. QUESTIONS AREA */}
      <section className="w-full px-4 md:px-6 pt-6 md:pt-8 flex-grow">
        <div className="max-w-[680px] mx-auto flex flex-col gap-4">
          
          {/* QUESTION 11 */}
          <div 
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default ${activeCard === 1 ? 'border-[1.5px] border-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]' : 'border border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]'}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#D6F0F8] text-[#1B9DC8] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">Q1</span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4">How knowledgeable do you feel about sexual and reproductive health?</h2>
            {renderChips(optionsQ1, qn11, 'qn11', 1)}
          </div>

          {/* QUESTION 12 */}
          <div 
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default ${activeCard === 2 ? 'border-[1.5px] border-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]' : 'border border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]'}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#D6F0F8] text-[#1B9DC8] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">Q2</span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4">Have you received formal education or training regarding sexual health?</h2>
            {renderChips(optionsQ2, qn12, 'qn12', 2)}
          </div>

          {/* QUESTION 13 */}
          <div 
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default ${activeCard === 3 ? 'border-[1.5px] border-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]' : 'border border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]'}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#D6F0F8] text-[#1B9DC8] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">Q3</span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4">Are sexual health services and resources accessible to you?</h2>
            {renderChips(optionsQ3, qn13, 'qn13', 3)}
          </div>

          {/* QUESTION 15 */}
          <div 
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default ${activeCard === 4 ? 'border-[1.5px] border-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]' : 'border border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]'}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#D6F0F8] text-[#1B9DC8] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">Q4</span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4">How aware are you of Sexually Transmitted Infections (STIs) and their prevention?</h2>
            {renderChips(optionsQ4, qn15, 'qn15', 4)}
          </div>

          {/* QUESTION 19 (CONDITIONAL) */}
          {showQn19 && (
            <div 
              className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default border-[1.5px] border-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-[#D6F0F8] text-[#1B9DC8] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">Q5</span>
              </div>
              <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4">Do you consistently use protection or contraception during sexual activity?</h2>
              {renderChips(optionsQ5, qn19, 'qn19', 5)}
            </div>
          )}

        </div>
      </section>

      {/* FIXED BOTTOM SECTION */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col">
        
        {/* PRIVACY REMINDER */}
        <div className="w-full bg-[#D6F0F8] py-2.5 px-6 flex justify-center items-center gap-2">
          <LockIcon className="text-[#126E8E]" />
          <span className="font-normal text-[12px] text-[#126E8E] text-center">
            Your answers are completely private and stored only on this device.
          </span>
        </div>

        {/* BOTTOM NAVIGATION BAR */}
        <div className="w-full bg-white h-[72px] px-6 border-t border-[#DDE4EA] shadow-[0_-2px_12px_rgba(0,0,0,0.06)] flex items-center justify-between">
          <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between">
            
            {/* Back Button */}
            <BackButton href="/assessment/safety-and-comfort" />


            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#1B9DC8] opacity-50"></div>
              <div className="w-2 h-2 rounded-full bg-[#1B9DC8] opacity-50"></div>
              <div className="w-5 h-2 rounded-full bg-[#1B9DC8]"></div>
              <div className="w-2 h-2 rounded-full bg-[#DDE4EA]"></div>
              <div className="w-2 h-2 rounded-full bg-[#DDE4EA]"></div>
              <div className="w-2 h-2 rounded-full bg-[#DDE4EA]"></div>
            </div>

            {/* Next Button */}
            <NextButton href="/assessment/relationships-and-social-influence" enabled={isNextEnabled} />

          </div>
        </div>
      </div>

    </main>
  );
}