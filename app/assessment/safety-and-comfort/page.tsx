"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { NextButton, BackButton, DisabledBackButton } from '@/app/components/NavButtons'
import { useHydratedAssessment } from '@/app/store/useHydratedStore';

// ============================================================================
// SVG ICONS
// ============================================================================
const ShieldIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
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
export default function QuestionnairePage2() {
  

  // --- Pull State from Global Store ---
  const { answers, setAnswer, isHydrated } = useHydratedAssessment();

  const qn9 = answers['qn9'] || "";
  const qn10 = answers['qn10'] || "";
  const qn14 = answers['qn14'] || "";
  const qn17 = answers['qn17'] || "";
  const qn60 = answers['qn60'] || "";
  const qn61 = answers['qn61'] || "";

  // --- State for UI ---
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [progressWidth, setProgressWidth] = useState<string>("16.6%");

  // Scroll to top and animate progress bar on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setProgressWidth("33.3%");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Clear conditional answer if parent question changes
  useEffect(() => {
    if (qn60 !== "Yes" && qn61 !== "") {
      setAnswer("qn61", ""); // "Unknown" is sent to model on submit when blank for hidden fields
    }
  }, [qn60, qn61, setAnswer]);

  // Validation logic
  const isNextEnabled =
    qn9 !== "" &&
    qn10 !== "" &&
    qn14 !== "" &&
    qn17 !== "" &&
    qn60 !== "" &&
    (qn60 !== "Yes" || qn61 !== "");

  // Options Data
  const optionsQ1 = ["All of the time", "Most of the time", "More than half of the time", "Less than half of the time", "Some of the time", "At no time"];
  const optionsQ2 = ["Yes", "No"];
  const optionsQ3_4 = ["Yes", "No", "Prefer not to say"];
  const optionsQ5 = ["Yes", "No"];
  const optionsQ6 = ["Very supportive", "Supportive", "Neither supportive nor unsupportive", "Unsupportive", "Very unsupportive", "Prefer not to say"];

  // Helper render for chips (Updated to use setAnswer directly)
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
                  ? 'bg-[#F4F8FB] border-[#5A6473] text-[#5A6473]' // Distinct active state for "Prefer not to say"
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
            <span className="font-medium text-[13px] text-[#5A6473]">Step 2 of 6</span>
            <span className="font-semibold text-[14px] text-[#1B9DC8]">Safety and Comfort</span>
          </div>
          <div className="w-full h-[6px] bg-[#DDE4EA] rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-[#1B9DC8] rounded-full transition-all duration-300 ease-in-out"
              style={{ width: progressWidth }}
            ></div>
          </div>
          <div className="text-right font-normal text-[12px] text-[#5A6473]">
            6 questions
          </div>
        </div>
      </section>

      {/* 3. PAGE HEADER */}
      <section className="w-full bg-white px-5 md:px-6 pt-8 md:pt-10 pb-6 rounded-b-[24px] shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
        <div className="max-w-[680px] mx-auto flex flex-col items-center text-center">
          <div className="w-[56px] h-[56px] rounded-full bg-[#D6F0F8] flex items-center justify-center mb-4">
            <ShieldIcon className="text-[#1B9DC8]" />
          </div>
          <h1 className="font-bold text-[22px] md:text-[28px] text-[#1A1A2E] mb-2">
            Safety and Comfort
          </h1>
          <p className="font-normal text-[16px] text-[#5A6473] max-w-[400px] leading-[1.6]">
            Let's talk about your environment and support systems.
          </p>
        </div>
      </section>

      {/* 4. QUESTIONS AREA */}
      <section className="w-full px-4 md:px-6 pt-6 md:pt-8 flex-grow">
        <div className="max-w-[680px] mx-auto flex flex-col gap-4">
          
          {/* QUESTION 9 */}
          <div 
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default ${activeCard === 1 ? 'border-[1.5px] border-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]' : 'border border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]'}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#D6F0F8] text-[#1B9DC8] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">Q1</span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4">How often do you feel safe in your daily environment?</h2>
            {renderChips(optionsQ1, qn9, 'qn9', 1)}
          </div>

          {/* QUESTION 10 */}
          <div 
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default ${activeCard === 2 ? 'border-[1.5px] border-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]' : 'border border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]'}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#D6F0F8] text-[#1B9DC8] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">Q2</span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4">Do you currently have someone you can trust and confide in?</h2>
            {renderChips(optionsQ2, qn10, 'qn10', 2)}
          </div>

          {/* QUESTION 14 */}
          <div 
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default ${activeCard === 3 ? 'border-[1.5px] border-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]' : 'border border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]'}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#D6F0F8] text-[#1B9DC8] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">Q3</span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4">Have you ever felt pressured into something you were uncomfortable with?</h2>
            {renderChips(optionsQ3_4, qn14, 'qn14', 3)}
          </div>

          {/* QUESTION 17 */}
          <div 
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default ${activeCard === 4 ? 'border-[1.5px] border-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]' : 'border border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]'}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#D6F0F8] text-[#1B9DC8] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">Q4</span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4">Do you know where to seek help if you feel unsafe?</h2>
            {renderChips(optionsQ3_4, qn17, 'qn17', 4)}
          </div>

          {/* QUESTION 60 */}
          <div 
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default ${activeCard === 5 ? 'border-[1.5px] border-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]' : 'border border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]'}`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#D6F0F8] text-[#1B9DC8] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">Q5</span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4">Are you currently part of any support groups or community networks?</h2>
            {renderChips(optionsQ5, qn60, 'qn60', 5)}
          </div>

          {/* QUESTION 61 (CONDITIONAL) */}
          {qn60 === "Yes" && (
            <div 
              className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default border-[1.5px] border-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-[#D6F0F8] text-[#1B9DC8] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">Q6</span>
              </div>
              <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4">How supportive do you find these groups?</h2>
              {renderChips(optionsQ6, qn61, 'qn61', 6)}
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
            <BackButton href="/assessment/about-you" />


            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#1B9DC8] opacity-50"></div>
              <div className="w-5 h-2 rounded-full bg-[#1B9DC8]"></div>
              <div className="w-2 h-2 rounded-full bg-[#DDE4EA]"></div>
              <div className="w-2 h-2 rounded-full bg-[#DDE4EA]"></div>
              <div className="w-2 h-2 rounded-full bg-[#DDE4EA]"></div>
              <div className="w-2 h-2 rounded-full bg-[#DDE4EA]"></div>
            </div>

            {/* Next Button */}
            <NextButton href="/assessment/sexual-health-knowledge" enabled={isNextEnabled} />


          </div>
        </div>
      </div>

    </main>
  );
}