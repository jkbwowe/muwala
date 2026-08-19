"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { NextButton, BackButton, DisabledBackButton } from '@/app/components/NavButtons'
import { useHydratedAssessment } from '@/app/store/useHydratedStore'; // Make sure this path matches where you created the file

// ============================================================================
// SVG ICONS
// ============================================================================
const PersonOutlineIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
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
export default function QuestionnairePage1() {
  
  //const router = useRouter();

  // --- Pull State from Global Store ---
  const { answers, setAnswer, isHydrated } = useHydratedAssessment();

  // Read current values (fallback to empty string if user hasn't answered yet)
  const q1Year = answers['qn1'] || "";
  const q2Mood = answers['qn7'] || "";
  const q3Stress = answers['qn8'] || "";

  // --- State for UI (kept local) ---
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [progressWidth, setProgressWidth] = useState<string>("0%");

  // Trigger progress bar animation on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth("16.6%");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Validation to enable/disable Next button
  const isNextEnabled = 
    q1Year.length === 4 && 
    parseInt(q1Year) >= 1990 && 
    parseInt(q1Year) <= 2010 && 
    q2Mood !== "" && 
    q3Stress !== "";

  // Options Data
  const moodOptions = [
    "Very good", "Good", "Neither good nor bad", "Poor", "Very poor"
  ];
  
  const stressOptions = [
    "All of the time", "Most of the time", "More than half of the time", 
    "Less than half of the time", "Some of the time", "At no time"
  ];

  /*
  const handleNext = () =>{
    router.push('/assessment/safety-and-comfort');
  }; */

  // Prevent hydration mismatch by not rendering the form until the client has loaded
  if (!isHydrated) {
    return null; // Or a simple loading state/spinner if you prefer
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
            <span className="font-medium text-[13px] text-[#5A6473]">Step 1 of 6</span>
            <span className="font-semibold text-[14px] text-[#1B9DC8]">About You</span>
          </div>
          <div className="w-full h-[6px] bg-[#DDE4EA] rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-[#1B9DC8] rounded-full transition-all duration-300 ease-in-out"
              style={{ width: progressWidth }}
            ></div>
          </div>
          <div className="text-right font-normal text-[12px] text-[#5A6473]">
            3 questions
          </div>
        </div>
      </section>

      {/* 3. PAGE HEADER */}
      <section className="w-full bg-white px-5 md:px-6 pt-8 md:pt-10 pb-6 rounded-b-[24px] shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
        <div className="max-w-[680px] mx-auto flex flex-col items-center text-center">
          <div className="w-[56px] h-[56px] rounded-full bg-[#D6F0F8] flex items-center justify-center mb-4">
            <PersonOutlineIcon className="text-[#1B9DC8]" />
          </div>
          <h1 className="font-bold text-[22px] md:text-[28px] text-[#1A1A2E] mb-2">
            About You
          </h1>
          <p className="font-normal text-[16px] text-[#5A6473] max-w-[400px] leading-[1.6]">
            Let's start with a few simple questions to understand your background.
          </p>
        </div>
      </section>

      {/* 4. QUESTIONS AREA */}
      <section className="w-full px-4 md:px-6 pt-6 md:pt-8 flex-grow">
        <div className="max-w-[680px] mx-auto flex flex-col gap-4">
          
          {/* --- QUESTION 1 --- */}
          <div 
            onClick={() => setActiveCard(1)}
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default ${
              activeCard === 1 
                ? 'border-[1.5px] border-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]' 
                : 'border border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#D6F0F8] text-[#1B9DC8] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">
                Q1
              </span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4">
              In which year were you born?
            </h2>
            <div className="flex flex-col gap-2">
              <input 
                type="number"
                placeholder="e.g. 2005"
                value={q1Year}
                onChange={(e) => setAnswer('qn1', e.target.value)} // Write directly to global store
                onFocus={() => setActiveCard(1)}
                className="w-full md:w-[180px] h-[48px] px-4 border-[1.5px] border-[#DDE4EA] rounded-[10px] font-normal text-[16px] text-[#1A1A2E] outline-none focus:border-[#1B9DC8] transition-colors placeholder:text-[#5A6473]/50"
              />
              <span className="font-normal text-[12px] text-[#5A6473]">
                Enter a year between 1990 and 2010
              </span>
            </div>
          </div>

          {/* --- QUESTION 2 --- */}
          <div 
            onClick={() => setActiveCard(2)}
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default ${
              activeCard === 2 
                ? 'border-[1.5px] border-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]' 
                : 'border border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#D6F0F8] text-[#1B9DC8] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">
                Q2
              </span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4 leading-snug">
              How would you describe your overall mood and emotional well-being on a daily basis?
            </h2>
            <div className="flex flex-wrap gap-x-2 gap-y-3 mt-2">
              {moodOptions.map((option) => {
                const isSelected = q2Mood === option;
                return (
                  <button
                    key={option}
                    onClick={() => { setAnswer('qn7', option); setActiveCard(2); }} // Write to store
                    className={`
                      flex items-center gap-2 px-5 py-2.5 rounded-[24px] border-[1.5px] transition-all duration-150
                      ${isSelected 
                        ? 'bg-[#D6F0F8] border-[#1B9DC8] text-[#126E8E]' 
                        : 'bg-white border-[#DDE4EA] text-[#5A6473] hover:bg-[#F4F8FB] hover:border-[#1B9DC8]'
                      }
                    `}
                  >
                    {isSelected && <CheckIcon className="text-[#1B9DC8]" />}
                    <span className={isSelected ? "font-semibold text-[14px]" : "font-medium text-[14px]"}>
                      {option}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* --- QUESTION 3 --- */}
          <div 
            onClick={() => setActiveCard(3)}
            className={`w-full bg-white rounded-[16px] p-6 md:p-7 transition-all duration-200 cursor-default ${
              activeCard === 3 
                ? 'border-[1.5px] border-[#1B9DC8] shadow-[0_0_0_4px_rgba(27,157,200,0.12)]' 
                : 'border border-[#DDE4EA] shadow-[0_2px_8px_rgba(0,0,0,0.05)]'
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#D6F0F8] text-[#1B9DC8] font-bold text-[11px] px-[10px] py-[3px] rounded-[20px]">
                Q3
              </span>
            </div>
            <h2 className="font-semibold text-[16px] text-[#1A1A2E] mb-4 leading-snug">
              Are you currently facing any stressors or challenges in your life?
            </h2>
            <div className="flex flex-wrap gap-x-2 gap-y-3 mt-2">
              {stressOptions.map((option) => {
                const isSelected = q3Stress === option;
                return (
                  <button
                    key={option}
                    onClick={() => { setAnswer('qn8', option); setActiveCard(3); }} // Write to store
                    className={`
                      flex items-center gap-2 px-5 py-2.5 rounded-[24px] border-[1.5px] transition-all duration-150
                      ${isSelected 
                        ? 'bg-[#D6F0F8] border-[#1B9DC8] text-[#126E8E]' 
                        : 'bg-white border-[#DDE4EA] text-[#5A6473] hover:bg-[#F4F8FB] hover:border-[#1B9DC8]'
                      }
                    `}
                  >
                    {isSelected && <CheckIcon className="text-[#1B9DC8]" />}
                    <span className={isSelected ? "font-semibold text-[14px]" : "font-medium text-[14px]"}>
                      {option}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

        </div>
      </section>

      {/* FIXED BOTTOM SECTION */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col">
        
        {/* 6. PRIVACY REMINDER */}
        <div className="w-full bg-[#D6F0F8] py-2.5 px-6 flex justify-center items-center gap-2">
          <LockIcon className="text-[#126E8E]" />
          <span className="font-normal text-[12px] text-[#126E8E] text-center">
            Your answers are completely private and stored only on this device.
          </span>
        </div>

        {/* 5. BOTTOM NAVIGATION BAR */}
        <div className="w-full bg-white h-[72px] px-6 border-t border-[#DDE4EA] shadow-[0_-2px_12px_rgba(0,0,0,0.06)] flex items-center justify-between">
          <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between">
            
            {/* Back Button (Disabled on Page 1) */}
            <DisabledBackButton />


            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-2 rounded-full bg-[#1B9DC8]"></div>
              <div className="w-2 h-2 rounded-full bg-[#DDE4EA]"></div>
              <div className="w-2 h-2 rounded-full bg-[#DDE4EA]"></div>
              <div className="w-2 h-2 rounded-full bg-[#DDE4EA]"></div>
              <div className="w-2 h-2 rounded-full bg-[#DDE4EA]"></div>
              <div className="w-2 h-2 rounded-full bg-[#DDE4EA]"></div>
            </div>

            {/* Next Button */}
            <NextButton href="/assessment/safety-and-comfort" enabled={isNextEnabled} />

          </div>
        </div>
      </div>

    </main>
  );
}