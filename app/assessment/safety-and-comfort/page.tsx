"use client";

import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/navigation';

// ============================================================================
// SVG ICONS
// ============================================================================
const ShieldHeartIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 14c-1.66-1.46-3-2.62-3-4a3 3 0 0 1 6 0c0 1.38-1.34 2.54-3 4z" fill="currentColor"/>
  </svg>
);

const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const InfoIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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
  // --- State for Answers ---
  const [qn9, setQn9] = useState<string>("");
  const [qn10, setQn10] = useState<string>("");
  const [qn14, setQn14] = useState<string>("");
  const [qn17, setQn17] = useState<string>("");
  const [qn60, setQn60] = useState<string>("");
  const [qn61, setQn61] = useState<string>("");

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
    if (qn60 !== "Yes") {
      setQn61(""); // "Unknown" is sent to model on submit when blank for hidden fields
    }
  }, [qn60]);

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

  // Helper render for chips
  const renderChips = (
    options: string[],
    currentValue: string,
    setValue: (val: string) => void,
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
              onClick={() => { setValue(option); setActiveCard(cardNumber); }}
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

  const router = useRouter();
  
    const handleNext = () =>{
      //logic
      router.push('/assessment/sexual-health-knowledge')
    }
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
            <span className="font-semibold text-[14px] text-[#1B9DC8]">Safety & Comfort</span>
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

      {/* 3. SENSITIVE TOPIC NOTICE */}
      <section className="w-full px-4 md:px-6">
        <div className="max-w-[680px] mx-auto mt-6 bg-[#FFF8F0] border-l-[4px] border-l-[#F0A500] rounded-r-[12px] p-[14px_18px] flex items-start md:items-center gap-3 shadow-sm">
          <ShieldHeartIcon className="text-[#F0A500] shrink-0 mt-[2px] md:mt-0" />
          <div className="flex flex-col">
            <span className="font-semibold text-[14px] text-[#1A1A2E]">This section covers personal topics.</span>
            <span className="font-normal text-[13px] text-[#5A6473] leading-[1.5]">There are no right or wrong answers. Your responses are completely private.</span>
          </div>
        </div>
      </section>

      {/* 4. PAGE HEADER */}
      <section className="w-full bg-white px-5 md:px-6 pt-8 pb-5 mt-6 rounded-b-[24px] shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
        <div className="max-w-[680px] mx-auto flex flex-col items-center text-center">
          <div className="w-[56px] h-[56px] rounded-full bg-[#D6F0F8] flex items-center justify-center mb-4">
            <ShieldCheckIcon className="text-[#1B9DC8]" />
          </div>
          <h1 className="font-bold text-[22px] md:text-[28px] text-[#1A1A2E] mb-2">
            Safety & Comfort
          </h1>
          <p className="font-normal text-[16px] text-[#5A6473] max-w-[420px] leading-[1.6]">
            These questions help us understand the pressures you may face in your daily life.
          </p>
        </div>
      </section>

      {/* 5. QUESTIONS AREA */}
      <section className="w-full px-4 md:px-6 pt-6 md:pt-8 flex-grow">
        <div className="max-w-[680px] mx-auto flex flex-col gap-4">
          
          {/* --- Q1 (qn9) --- */}
          <div 
            onClick={() => setActiveCard(1)}
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default ${
              activeCard === 1 
                ? 'border-[1.5px] border-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]' 
                : 'border border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]'
            }`}
          >
            <div className="flex items-center mb-3">
              <span className="bg-[#D6F0F8] text-[#1B9DC8] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">
                Q1
              </span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4 leading-snug">
              Do you feel uncomfortable saying 'no' in uncomfortable situations, such as peer pressure or advances from others?
            </h2>
            {renderChips(optionsQ1, qn9, setQn9, 1)}
          </div>

          {/* --- Q2 (qn10) --- */}
          <div 
            onClick={() => setActiveCard(2)}
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default ${
              activeCard === 2 
                ? 'border-[1.5px] border-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]' 
                : 'border border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]'
            }`}
          >
            <div className="flex items-center mb-3">
              <span className="bg-[#D6F0F8] text-[#1B9DC8] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">
                Q2
              </span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4 leading-snug">
              Have you ever felt pressured into engaging in activities you were not comfortable with?
            </h2>
            {renderChips(optionsQ2, qn10, setQn10, 2)}
          </div>

          {/* --- Q3 (qn14) - SENSITIVE --- */}
          <div 
            onClick={() => setActiveCard(3)}
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default border-l-[3px] border-l-[#D6F0F8] ${
              activeCard === 3 
                ? 'border-y-[1.5px] border-r-[1.5px] border-y-[#1B9DC8] border-r-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]' 
                : 'border-y border-r border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]'
            }`}
          >
            <div className="flex items-center mb-2">
              <span className="bg-[#D6F0F8] text-[#126E8E] font-medium text-[11px] px-[10px] py-[2px] rounded-[20px]">
                Sensitive
              </span>
            </div>
            <div className="flex items-center mb-3">
              <span className="bg-[#D6F0F8] text-[#1B9DC8] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">
                Q3
              </span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4 leading-snug">
              Have you ever experienced pressure or coercion to engage in sexual activity?
            </h2>
            {renderChips(optionsQ3_4, qn14, setQn14, 3)}
          </div>

          {/* --- Q4 (qn17) - SENSITIVE + BRANCHING --- */}
          <div 
            onClick={() => setActiveCard(4)}
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default border-l-[3px] border-l-[#D6F0F8] ${
              activeCard === 4 
                ? 'border-y-[1.5px] border-r-[1.5px] border-y-[#1B9DC8] border-r-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]' 
                : 'border-y border-r border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]'
            }`}
          >
            <div className="flex items-center mb-2">
              <span className="bg-[#D6F0F8] text-[#126E8E] font-medium text-[11px] px-[10px] py-[2px] rounded-[20px]">
                Sensitive
              </span>
            </div>
            <div className="flex items-center mb-3">
              <span className="bg-[#D6F0F8] text-[#1B9DC8] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">
                Q4
              </span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4 leading-snug">
              Are you still a virgin?
            </h2>
            {renderChips(optionsQ3_4, qn17, setQn17, 4)}
            
            {/* Branching indicator */}
            <div className="flex items-center gap-1.5 mt-4 text-[#5A6473]">
              <InfoIcon />
              <span className="font-normal text-[12px]">Your answer shapes the next few questions.</span>
            </div>
          </div>

          {/* --- Q5 (qn60) - BRANCHING --- */}
          <div 
            onClick={() => setActiveCard(5)}
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default ${
              activeCard === 5 
                ? 'border-[1.5px] border-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]' 
                : 'border border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]'
            }`}
          >
            <div className="flex items-center mb-3">
              <span className="bg-[#D6F0F8] text-[#1B9DC8] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">
                Q5
              </span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4 leading-snug">
              Are you currently in a romantic relationship?
            </h2>
            {renderChips(optionsQ5, qn60, setQn60, 5)}
            
            {/* Branching indicator */}
            <div className="flex items-center gap-1.5 mt-4 text-[#5A6473]">
              <InfoIcon />
              <span className="font-normal text-[12px]">Answering 'Yes' will reveal one more question.</span>
            </div>
          </div>

          {/* --- Q6 (qn61) - CONDITIONAL --- */}
          <div 
            className={`grid transition-[grid-template-rows,opacity,margin] duration-350 ease-in-out ${
              qn60 === "Yes" ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <div 
                onClick={() => setActiveCard(6)}
                className={`w-full bg-white rounded-[16px] p-6 md:p-7 cursor-default border-l-[3px] border-l-[#2EAF7D] mb-[2px] mt-1 transition-all duration-200 ${
                  activeCard === 6 
                    ? 'border-y-[1.5px] border-r-[1.5px] border-y-[#1B9DC8] border-r-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]' 
                    : 'border-y border-r border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]'
                }`}
              >
                <div className="flex items-center mb-2">
                  <span className="bg-[#E8F8F2] text-[#2EAF7D] font-medium text-[11px] px-[10px] py-[2px] rounded-[20px]">
                    Based on your answer above
                  </span>
                </div>
                <div className="flex items-center mb-3">
                  <span className="bg-[#E8F8F2] text-[#2EAF7D] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">
                    Q6
                  </span>
                </div>
                <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4 leading-snug">
                  How respectful and supportive is your partner towards your decisions and boundaries?
                </h2>
                {renderChips(optionsQ6, qn61, setQn61, 6)}
              </div>
            </div>
          </div>

          {/* 6. SUPPORT RESOURCE STRIP */}
          <div className="w-full mt-2 bg-[#FFF8F0] border border-[#F0C06A] rounded-[12px] p-[14px_18px] flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-start md:items-center gap-3">
              <PhoneIcon className="text-[#F0A500] shrink-0 mt-[2px] md:mt-0" />
              <div className="flex flex-col">
                <span className="font-semibold text-[13px] text-[#1A1A2E]">Need to talk to someone?</span>
                <span className="font-normal text-[12px] text-[#5A6473]">Uganda crisis line: 0800 111 000 (free, 24/7)</span>
              </div>
            </div>
            <a href="#" className="font-medium text-[12px] text-[#1B9DC8] hover:underline whitespace-nowrap self-start md:self-auto ml-[32px] md:ml-0">
              More resources &rarr;
            </a>
          </div>

        </div>
      </section>

      {/* FIXED BOTTOM SECTION */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col">
        
        {/* 8. PRIVACY REMINDER STRIP */}
        <div className="w-full bg-[#D6F0F8] py-2.5 px-6 flex justify-center items-center gap-2">
          <LockIcon className="text-[#126E8E]" />
          <span className="font-normal text-[12px] text-[#126E8E] text-center">
            Your answers are completely private and stored only on this device.
          </span>
        </div>

        {/* 7. BOTTOM NAVIGATION BAR */}
        <div className="w-full bg-white h-[72px] px-6 border-t border-[#DDE4EA] shadow-[0_-2px_12px_rgba(0,0,0,0.06)] flex items-center justify-between">
          <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between">
            
            {/* Back Button (Active) */}
            <button className="flex items-center gap-2 text-[#5A6473] hover:text-[#1A1A2E] transition-colors font-medium text-[15px] min-h-[44px] px-2 -ml-2">
              <ArrowLeftIcon />
              <span>Back</span>
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#2EAF7D]"></div> {/* Step 1: Visited */}
              <div className="w-5 h-2 rounded-full bg-[#1B9DC8]"></div> {/* Step 2: Active */}
              <div className="w-2 h-2 rounded-full bg-[#DDE4EA]"></div>
              <div className="w-2 h-2 rounded-full bg-[#DDE4EA]"></div>
              <div className="w-2 h-2 rounded-full bg-[#DDE4EA]"></div>
              <div className="w-2 h-2 rounded-full bg-[#DDE4EA]"></div>
            </div>

            {/* Next Button */}
            <button 
              onClick={handleNext}
              disabled={!isNextEnabled}
              className={`
                flex items-center gap-2 font-semibold text-[15px] px-7 py-3 rounded-[10px] min-h-[44px] transition-all duration-200
                ${isNextEnabled 
                  ? 'bg-[#1B9DC8] hover:bg-[#126E8E] text-white cursor-pointer shadow-sm' 
                  : 'bg-[#DDE4EA] text-[#5A6473] cursor-not-allowed'
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