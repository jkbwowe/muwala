"use client";

import React, { useState, useEffect } from "react";
import { 
  MessageCircle, 
  Leaf, 
  ArrowRightCircle, 
  ArrowLeft, 
  Heart,
  CheckCircle2
} from "lucide-react";

// --- Types & Data ---

type Answers = {
  qn20: string;
  qn21: string;
  qn36: string; // Hidden duplicate of qn20
  qn55: string;
  qn56: string;
  qn57: string;
  qn58: string;
};

const Q1_OPTIONS = ["Very often", "Often", "Sometimes", "Rarely", "Never"];
const Q2_OPTIONS = ["Yes, regularly", "Yes, occasionally", "Rarely", "No, never"];
const Q3_OPTIONS = ["Very aware", "Aware", "Somewhat aware", "Not very aware", "Not aware at all"];
const Q4_OPTIONS = ["Very often", "Often", "Sometimes", "Rarely", "Never"];
const Q5_OPTIONS = ["Yes, regularly", "Yes, occasionally", "Rarely", "No, never"];
const Q6_OPTIONS = [
  "Yes, regularly provided",
  "Yes, but limited access",
  "No, not provided",
  "I am not sure"
];

// --- Sub-components ---

const NavBar = () => (
  <header className="bg-white h-[56px] md:h-[64px] flex items-center justify-between px-4 md:px-6 border-b border-[#DDE4EA] sticky top-0 z-50">
    <div className="flex items-center gap-2 text-[#1A1A2E] font-bold text-xl">
      <Heart className="w-6 h-6 text-[#1B9DC8]" fill="#1B9DC8" />
      <span>HSH</span>
    </div>
    <button className="text-[#E05C3A] text-sm font-medium border border-[#E05C3A] rounded-full px-4 py-1.5 hover:bg-[#E05C3A]/5 transition-colors">
      Save & Exit
    </button>
  </header>
);

const ProgressBar = () => {
  const [progress, setProgress] = useState("66.6%");

  useEffect(() => {
    // Animate from 66.6% to 83.3% on mount
    const timer = setTimeout(() => setProgress("83.3%"), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-[680px] mx-auto px-4 pt-6 pb-2">
      <div className="flex justify-between items-end mb-2">
        <span className="text-[#5A6473] text-[13px] font-medium font-sans">Step 5 of 6</span>
        <span className="text-[#1B9DC8] text-[14px] font-semibold font-sans">Health Discussions & Menstrual Health</span>
      </div>
      <div className="h-2 w-full bg-[#DDE4EA] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#1B9DC8] transition-all duration-700 ease-out rounded-full"
          style={{ width: progress }}
        />
      </div>
      <div className="text-right mt-1.5">
        <span className="text-[#5A6473] text-[12px] font-normal font-sans">6 questions</span>
      </div>
    </div>
  );
};

const GroupLabelHeader = ({ title, icon: Icon, color }: { title: string, icon: any, color: 'blue' | 'green' }) => {
  const isBlue = color === 'blue';
  return (
    <div className="max-w-[680px] mx-auto w-full px-4 md:px-0 pb-3 flex justify-start">
      <div className={`inline-flex items-center gap-2 px-[14px] py-[6px] rounded-md ${isBlue ? 'bg-[#D6F0F8]' : 'bg-[#E8F8F2]'}`}>
        <Icon className={`w-[14px] h-[14px] ${isBlue ? 'text-[#1B9DC8]' : 'text-[#2EAF7D]'}`} />
        <span className={`text-[11px] font-bold uppercase tracking-[0.06em] font-sans ${isBlue ? 'text-[#1B9DC8]' : 'text-[#2EAF7D]'}`}>
          {title}
        </span>
      </div>
    </div>
  );
};

const PillChip = ({ 
  label, 
  isSelected, 
  onClick, 
  colorVariant 
}: { 
  label: string; 
  isSelected: boolean; 
  onClick: () => void;
  colorVariant: 'blue' | 'green';
}) => {
  const isBlue = colorVariant === 'blue';
  
  const baseClasses = "px-4 py-2 rounded-full text-[14px] font-medium transition-all duration-200 border cursor-pointer font-sans select-none";
  const unselectedClasses = "bg-white border-[#DDE4EA] text-[#5A6473] hover:border-[#1A1A2E]/30";
  
  let selectedClasses = "";
  if (isBlue) {
    selectedClasses = "bg-[#1B9DC8] border-[#1B9DC8] text-white";
  } else {
    selectedClasses = "bg-[#2EAF7D] border-[#2EAF7D] text-white";
  }

  return (
    <div 
      onClick={onClick}
      className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
    >
      {label}
    </div>
  );
};

// --- Main Page Component ---

export default function Page5() {
  const [answers, setAnswers] = useState<Answers>({
    qn20: "",
    qn21: "",
    qn36: "",
    qn55: "",
    qn56: "",
    qn57: "",
    qn58: ""
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelect = (qn: keyof Answers, value: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [qn]: value };
      // Developer requirement: bind qn20 and qn36 together silently
      if (qn === "qn20") next.qn36 = value;
      return next;
    });
  };

  const isNextEnabled = Boolean(
    answers.qn20 && 
    answers.qn21 && 
    answers.qn55 && 
    answers.qn56 && 
    answers.qn57 && 
    answers.qn58
  );

  return (
    <div className="min-h-screen bg-[#F4F8FB] font-sans flex flex-col">
      <NavBar />
      
      <main className="flex-grow pb-32">
        <div className="bg-white pb-5 rounded-b-3xl shadow-sm">
          <ProgressBar />
          
          {/* Page Header */}
          <div className="max-w-[680px] mx-auto px-6 pt-8 pb-5 flex flex-col items-center text-center">
            <div className="w-[56px] h-[56px] bg-[#D6F0F8] rounded-full flex items-center justify-center mb-4">
              {/* Approximating Speech bubble with heart */}
              <div className="relative text-[#1B9DC8]">
                <MessageCircle className="w-[28px] h-[28px]" />
                <Heart className="w-[10px] h-[10px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" fill="currentColor" />
              </div>
            </div>
            <h1 className="text-[22px] md:text-[28px] font-bold text-[#1A1A2E] mb-2 font-sans">
              Health Discussions
            </h1>
            <p className="text-[16px] text-[#5A6473] max-w-[440px] leading-[1.6] font-sans">
              How openly do you talk about health topics — and what do you know about your own body?
            </p>
          </div>
        </div>

        <div className="max-w-[680px] mx-auto pt-8">
          
          {/* ================= GROUP A ================= */}
          <GroupLabelHeader title="Health Discussions" icon={MessageCircle} color="blue" />
          
          <div className="px-4 md:px-6 py-2 md:py-4 space-y-8">
            
            {/* Q1 (qn20 & qn36) */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 bg-[#D6F0F8] text-[#1B9DC8] px-3 py-1 rounded-full text-[13px] font-bold">
                  Q1
                </span>
                <p className="text-[#1A1A2E] font-semibold text-[16px] pt-0.5">
                  How often do you discuss sexual health and contraception with a healthcare provider or a trusted adult?
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pl-[44px]">
                {Q1_OPTIONS.map((opt) => (
                  <PillChip 
                    key={opt}
                    label={opt}
                    isSelected={answers.qn20 === opt}
                    onClick={() => handleSelect("qn20", opt)}
                    colorVariant="blue"
                  />
                ))}
              </div>
            </div>

            {/* Q2 (qn21) */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 bg-[#D6F0F8] text-[#1B9DC8] px-3 py-1 rounded-full text-[13px] font-bold">
                  Q2
                </span>
                <p className="text-[#1A1A2E] font-semibold text-[16px] pt-0.5">
                  Do you discuss sexual health and contraception with your friends and peers?
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pl-[44px]">
                {Q2_OPTIONS.map((opt) => (
                  <PillChip 
                    key={opt}
                    label={opt}
                    isSelected={answers.qn21 === opt}
                    onClick={() => handleSelect("qn21", opt)}
                    colorVariant="blue"
                  />
                ))}
              </div>
            </div>

          </div>

          {/* ================= GROUP DIVIDER ================= */}
          <div className="my-8 relative flex items-center justify-center px-4 md:px-0">
            <div className="absolute w-full border-t border-[#DDE4EA] left-0"></div>
            <div className="relative bg-[#F4F8FB] px-3 text-[#5A6473] font-medium text-[13px] font-sans">
              Menstrual Health
            </div>
          </div>

          {/* ================= GROUP B ================= */}
          <GroupLabelHeader title="Menstrual Health Awareness" icon={Leaf} color="green" />
          
          <div className="px-4 md:px-6 py-2 md:py-4 space-y-8">
            
            {/* Q3 (qn55) */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 bg-[#E8F8F2] text-[#2EAF7D] px-3 py-1 rounded-full text-[13px] font-bold">
                  Q3
                </span>
                <p className="text-[#1A1A2E] font-semibold text-[16px] pt-0.5">
                  Are you aware of your reproductive health and menstrual cycle?
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pl-[44px]">
                {Q3_OPTIONS.map((opt) => (
                  <PillChip 
                    key={opt}
                    label={opt}
                    isSelected={answers.qn55 === opt}
                    onClick={() => handleSelect("qn55", opt)}
                    colorVariant="green"
                  />
                ))}
              </div>
            </div>

            {/* Q4 (qn56) */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 bg-[#E8F8F2] text-[#2EAF7D] px-3 py-1 rounded-full text-[13px] font-bold">
                  Q4
                </span>
                <p className="text-[#1A1A2E] font-semibold text-[16px] pt-0.5">
                  How often do you discuss menstrual health management with a healthcare provider or a trusted adult?
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pl-[44px]">
                {Q4_OPTIONS.map((opt) => (
                  <PillChip 
                    key={opt}
                    label={opt}
                    isSelected={answers.qn56 === opt}
                    onClick={() => handleSelect("qn56", opt)}
                    colorVariant="green"
                  />
                ))}
              </div>
            </div>

            {/* Q5 (qn57) */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 bg-[#E8F8F2] text-[#2EAF7D] px-3 py-1 rounded-full text-[13px] font-bold">
                  Q5
                </span>
                <p className="text-[#1A1A2E] font-semibold text-[16px] pt-0.5">
                  Do you discuss menstrual health management with your friends and peers?
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pl-[44px]">
                {Q5_OPTIONS.map((opt) => (
                  <PillChip 
                    key={opt}
                    label={opt}
                    isSelected={answers.qn57 === opt}
                    onClick={() => handleSelect("qn57", opt)}
                    colorVariant="green"
                  />
                ))}
              </div>
            </div>

            {/* Q6 (qn58) */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 bg-[#E8F8F2] text-[#2EAF7D] px-3 py-1 rounded-full text-[13px] font-bold">
                  Q6
                </span>
                <p className="text-[#1A1A2E] font-semibold text-[16px] pt-0.5">
                  Does your community or school provide access to information on menstrual health management?
                </p>
              </div>
              <div className="flex flex-col gap-2 pl-0 md:pl-[44px]">
                {Q6_OPTIONS.map((opt) => {
                  const isSelected = answers.qn58 === opt;
                  return (
                    <div 
                      key={opt}
                      onClick={() => handleSelect("qn58", opt)}
                      className={`
                        w-full flex items-center p-[14px] px-4 rounded-[10px] cursor-pointer transition-all duration-200
                        ${isSelected 
                          ? 'bg-[#F0FBF6] border-[1.5px] border-[#2EAF7D]' 
                          : 'bg-white border border-[#DDE4EA] hover:bg-[#F9FBFC] hover:border-[#2EAF7D]'}
                      `}
                    >
                      <div className={`
                        w-[20px] h-[20px] rounded-full flex items-center justify-center flex-shrink-0 mr-3
                        ${isSelected ? 'border-[6px] border-[#2EAF7D] bg-white' : 'border-[2px] border-[#DDE4EA] bg-white'}
                      `}></div>
                      <span className="text-[15px] text-[#1A1A2E] font-normal font-sans">
                        {opt}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ================= FINAL PUSH STRIP ================= */}
          <div className="px-4 md:px-0 mt-6">
            <div className="bg-gradient-to-br from-[#D6F0F8] to-[#E8F8F2] border border-[#A8DFC8] rounded-xl p-[14px] md:px-[18px] flex flex-col md:flex-row items-start md:items-center gap-3">
              <div className="flex-shrink-0 text-[#1B9DC8]">
                <ArrowRightCircle className="w-[20px] h-[20px]" />
              </div>
              <div>
                <p className="text-[#1A1A2E] font-bold text-[13px] mb-0.5 font-sans">One section left!</p>
                <p className="text-[#5A6473] font-normal text-[12px] font-sans">You are almost done with your assessment.</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* ================= BOTTOM NAVIGATION & PRIVACY ================= */}
      <div className="fixed bottom-0 left-0 w-full bg-[#F4F8FB] border-t border-[#DDE4EA] flex flex-col items-center">
        {/* Privacy Strip */}
        <div className="w-full bg-[#F4F8FB] py-2 flex justify-center">
          <span className="text-[#5A6473] text-[11px] md:text-[12px] font-sans text-center px-4">
            Your answers are completely private and stored only on this device.
          </span>
        </div>
        
        {/* Bottom Nav Bar */}
        <div className="w-full bg-white px-4 md:px-8 py-3 md:py-4 flex items-center justify-between shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
          <button className="flex items-center gap-2 text-[#5A6473] font-medium text-[15px] hover:text-[#1A1A2E] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#2EAF7D]"></div>
            <div className="w-2 h-2 rounded-full bg-[#2EAF7D]"></div>
            <div className="w-2 h-2 rounded-full bg-[#2EAF7D]"></div>
            <div className="w-2 h-2 rounded-full bg-[#2EAF7D]"></div>
            <div className="w-5 h-2 rounded-full bg-[#1B9DC8]"></div>
            <div className="w-2 h-2 rounded-full bg-[#DDE4EA]"></div>
          </div>
          
          <button 
            disabled={!isNextEnabled}
            className={`
              flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-[15px] transition-all
              ${isNextEnabled 
                ? 'bg-[#1B9DC8] hover:bg-[#126E8E] text-white shadow-md' 
                : 'bg-[#DDE4EA] text-[#5A6473] cursor-not-allowed'}
            `}
          >
            <span>Next</span>
            <ArrowRightCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}