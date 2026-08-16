"use client";

import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/navigation';

// ============================================================================
// SVG ICONS (Reused from reference + custom for Page 3)
// ============================================================================
const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const LockIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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

const LightbulbIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);

const BookOpenIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const InfoIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// ============================================================================
// PAGE COMPONENT
// ============================================================================
export default function QuestionnairePage3() {
  // --- MOCK STATE FROM PREVIOUS PAGE ---
  // If qn17 from Page 2 is "No" (not a virgin), show qn19. Otherwise hide it.
  const [qn17_isVirgin] = useState<"Yes" | "No">("No"); 
  const showQn19 = qn17_isVirgin === "No";

  // --- State for Answers ---
  const [qn11, setQn11] = useState<string>("");
  const [qn12, setQn12] = useState<string>("");
  const [qn13, setQn13] = useState<string>("");
  const [qn15, setQn15] = useState<string>("");
  const [qn19, setQn19] = useState<string>("");

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

  // Helper render for chips (Maintains exact button effects from reference)
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
      router.push('/assessment/relationships-and-social-influence')
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
            <span className="font-medium text-[13px] text-[#5A6473]">Step 3 of 6</span>
            <span className="font-semibold text-[14px] text-[#1B9DC8]">Sexual Health Knowledge</span>
          </div>
          <div className="w-full h-[6px] bg-[#DDE4EA] rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-[#1B9DC8] rounded-full transition-all duration-500 ease-in-out"
              style={{ width: progressWidth }}
            ></div>
          </div>
          <div className="text-right font-normal text-[12px] text-[#5A6473]">
            {showQn19 ? "5 questions" : "4 questions"}
          </div>
        </div>
      </section>

      {/* 3. CONTEXT BANNER */}
      <section className="w-full px-4 md:px-6">
        <div className="max-w-[680px] mx-auto mt-6 bg-[#EAF7FF] border-l-[4px] border-l-[#1B9DC8] rounded-r-[12px] p-[14px_18px] flex items-start md:items-center gap-3 shadow-sm">
          <LightbulbIcon className="text-[#1B9DC8] shrink-0 mt-[2px] md:mt-0" />
          <div className="flex flex-col">
            <span className="font-semibold text-[14px] text-[#1A1A2E]">Knowledge is power.</span>
            <span className="font-normal text-[13px] text-[#5A6473] leading-[1.5]">These questions measure awareness, not behaviour. There are no wrong answers.</span>
          </div>
        </div>
      </section>

      {/* 4. PAGE HEADER */}
      <section className="w-full bg-white px-5 md:px-6 pt-8 pb-5 mt-6 rounded-b-[24px] shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
        <div className="max-w-[680px] mx-auto flex flex-col items-center text-center">
          <div className="w-[56px] h-[56px] rounded-full bg-[#D6F0F8] flex items-center justify-center mb-4">
            <BookOpenIcon className="text-[#1B9DC8]" />
          </div>
          <h1 className="font-bold text-[22px] md:text-[28px] text-[#1A1A2E] mb-2">
            Sexual Health Knowledge
          </h1>
          <p className="font-normal text-[16px] text-[#5A6473] max-w-[420px] leading-[1.6]">
            Help us understand what information and resources you have access to.
          </p>
        </div>
      </section>

      {/* 5. QUESTIONS AREA */}
      <section className="w-full px-4 md:px-6 pt-6 md:pt-8 flex-grow">
        <div className="max-w-[680px] mx-auto flex flex-col gap-4">
          
          {/* --- Q1 (qn11) --- */}
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
              How knowledgeable do you feel about topics related to sexual health, contraception, and pregnancy prevention?
            </h2>
            {renderChips(optionsQ1, qn11, setQn11, 1)}
          </div>

          {/* --- Q2 (qn12) --- */}
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
              Have you received any sexual education at school or through other sources?
            </h2>
            {renderChips(optionsQ2, qn12, setQn12, 2)}
          </div>

          {/* --- Q3 (qn13) --- */}
          <div 
            onClick={() => setActiveCard(3)}
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default ${
              activeCard === 3 
                ? 'border-[1.5px] border-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]' 
                : 'border border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]'
            }`}
          >
            <div className="flex items-center mb-3">
              <span className="bg-[#D6F0F8] text-[#1B9DC8] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">
                Q3
              </span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4 leading-snug">
              Do you have access to reproductive health services and information in your community?
            </h2>
            {renderChips(optionsQ3, qn13, setQn13, 3)}
          </div>

          {/* --- Q4 (qn15) --- */}
          <div 
            onClick={() => setActiveCard(4)}
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default ${
              activeCard === 4 
                ? 'border-[1.5px] border-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]' 
                : 'border border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]'
            }`}
          >
            <div className="flex items-center mb-3">
              <span className="bg-[#D6F0F8] text-[#1B9DC8] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">
                Q4
              </span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4 leading-snug">
              Are you aware of the risks and consequences associated with teenage pregnancy, including health risks and social challenges?
            </h2>
            {renderChips(optionsQ4, qn15, setQn15, 4)}
          </div>

          {/* --- Q5 (qn19) - CONDITIONAL BASED ON PAGE 2 --- */}
          {showQn19 && (
            <div 
              onClick={() => setActiveCard(5)}
              className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default border-l-[3px] border-l-[#2EAF7D] ${
                activeCard === 5 
                  ? 'border-y-[1.5px] border-r-[1.5px] border-y-[#1B9DC8] border-r-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]' 
                  : 'border-y border-r border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]'
              }`}
            >
              <div className="flex items-center mb-2">
                <span className="bg-[#E8F8F2] text-[#2EAF7D] font-medium text-[11px] px-[10px] py-[2px] rounded-[20px]">
                  Based on your previous answer
                </span>
              </div>
              <div className="flex items-center mb-3">
                <span className="bg-[#E8F8F2] text-[#2EAF7D] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">
                  Q5
                </span>
              </div>
              <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4 leading-snug">
                Are you currently using any form of contraception or protection during sexual activity?
              </h2>
              {renderChips(optionsQ5, qn19, setQn19, 5)}
              
              <div className="flex items-start gap-2 mt-4 text-[#5A6473]">
                <InfoIcon className="text-[#2EAF7D] mt-[2px] shrink-0" />
                <span className="font-normal text-[12px]">Contraception information is available at your nearest health centre.</span>
              </div>
            </div>
          )}

          {/* 6. HALFWAY MILESTONE BANNER */}
          <div className="w-full mt-2 rounded-[16px] bg-gradient-to-br from-[#1B9DC8] to-[#2EAF7D] p-[20px_24px] flex items-center gap-4 shadow-sm">
            <StarIcon className="text-white shrink-0" />
            <div className="flex flex-col">
              <span className="font-bold text-[16px] text-white">You're halfway there!</span>
              <span className="font-normal text-[13px] text-white/85 leading-[1.5]">3 more sections to go. You're doing great.</span>
            </div>
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
              <div className="w-2 h-2 rounded-full bg-[#2EAF7D]"></div> {/* Step 2: Visited */}
              <div className="w-5 h-2 rounded-full bg-[#1B9DC8]"></div> {/* Step 3: Active */}
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