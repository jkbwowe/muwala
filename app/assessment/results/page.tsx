"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAssessmentStore } from "@/app/store/assessmentStore";
import { runAllModels, mapToRiskStatus } from "@/app/lib/predict";

// ============================================================================
// ICONS
// ============================================================================
const CheckmarkIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
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

const GraduationIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
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

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const HeartPulseIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
  </svg>
);

const DownloadIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const BookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
);

const MessageIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

const HospitalIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="14" height="14" x="5" y="5" rx="2" ry="2"/><path d="M12 9v6"/><path d="M9 12h6"/></svg>
);

const PillIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

// ============================================================================
// TYPES & DATA
// ============================================================================
type RiskStatus = "LOW" | "HIGH";
type ModelType = "DROPOUT" | "PREGNANCY" | "EXPOSURE";

interface RiskCardData {
  id: string;
  type: ModelType;
  status: RiskStatus;
}

// Content definitions based on spec
const CONTENT = {
  DROPOUT: {
    LOW: {
      label: "Currently In School",
      desc: "Your responses suggest you are currently enrolled in school.",
      meaning:
        "Your answers suggest you have strong protective factors keeping you in school — including awareness of risks, access to information, and healthy relationships.",
      actions: [
        { icon: <BookIcon />, text: "Keep engaging with your education and support network." },
        { icon: <MessageIcon />, text: "Talk openly with trusted adults about your goals." },
        { icon: <CheckCircleIcon />, text: "You are on a good path — stay informed and aware." },
      ],
    },
    HIGH: {
      label: "At Risk of Dropout",
      desc: "Some factors in your responses suggest a risk of school dropout.",
      meaning:
        "Some of your responses suggest factors that are associated with school dropout. This does not mean you will drop out — but it means support could help.",
      actions: [
        { icon: <BookIcon />, text: "Speak with a teacher, counsellor, or trusted adult about your situation." },
        { icon: <PhoneIcon />, text: "Contact Hope Springs Health Foundation for free support and guidance." },
        { icon: <CheckCircleIcon />, text: "Know that support exists — dropout is not inevitable." },
      ],
    },
  },
  PREGNANCY: {
    LOW: {
      label: "No Pregnancy Risk",
      desc: "No significant pregnancy risk factors were detected.",
      meaning:
        "No significant pregnancy risk factors were found. Your awareness of reproductive health and your choices suggest lower risk.",
      actions: [
        { icon: <CheckCircleIcon />, text: "Continue making informed choices about your health." },
        { icon: <BookIcon />, text: "Stay educated on reproductive health and your rights." },
        { icon: <MessageIcon />, text: "Be a positive influence and share knowledge with peers." },
      ],
    },
    HIGH: {
      label: "Pregnancy Risk Detected",
      desc: "Risk factors associated with pregnancy were found in your responses.",
      meaning:
        "Some factors in your responses are associated with higher pregnancy risk. This is not a diagnosis — speaking with a trusted adult or health worker can help.",
      actions: [
        { icon: <HospitalIcon />, text: "Visit your nearest health centre to speak with a health worker." },
        { icon: <PillIcon />, text: "Ask about contraception options that are right for you." },
        { icon: <UserIcon />, text: "Talk to a trusted adult or peer mentor about your concerns." },
      ],
    },
  },
  EXPOSURE: {
    LOW: {
      label: "No Exposure Detected",
      desc: "No signs of exposure to older individuals were detected.",
      meaning:
        "Your responses did not indicate signs of exposure to significantly older individuals seeking romantic relationships.",
      actions: [
        { icon: <ShieldIcon />, text: "Maintain strong boundaries in all your relationships." },
        { icon: <MessageIcon />, text: "Continue communicating openly with people you trust." },
        { icon: <CheckCircleIcon />, text: "Stay informed about healthy relationship dynamics." },
      ],
    },
    HIGH: {
      label: "Exposure Risk Detected",
      desc: "Your responses indicate possible exposure to significantly older individuals.",
      meaning:
        "Your responses suggest you may have encountered or be at risk of contact with significantly older individuals seeking romantic relationships. Support is available.",
      actions: [
        { icon: <ShieldIcon />, text: "Trust your instincts — you have the right to say no." },
        { icon: <PhoneIcon />, text: "Uganda crisis line: 0800 111 000 (free, confidential, 24/7)." },
        { icon: <MessageIcon />, text: "Talk to someone you trust about any uncomfortable situations." },
      ],
    },
  },
};

// ============================================================================
// COMPONENTS
// ============================================================================

const RiskCard = ({
  data,
  isOpen,
  onToggle,
}: {
  data: RiskCardData;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const { type, status } = data;
  const isHigh = status === "HIGH";

  // Colors based on spec
  const bgTint = isHigh ? "bg-[#FEF0EB]" : "bg-[#E8F8F2]";
  const borderColor = isHigh ? "border-[#F4B89A]" : "border-[#A8DFC8]";
  const iconBg = isHigh ? "bg-[#E05C3A]/15" : "bg-[#2EAF7D]/15";
  const iconColor = isHigh ? "text-[#E05C3A]" : "text-[#2EAF7D]";
  const badgeBg = isHigh ? "bg-[#FEF0EB]" : "bg-[#E8F8F2]";
  const badgeBorder = isHigh ? "border-[#F4B89A]" : "border-[#A8DFC8]";
  const badgeText = isHigh ? "text-[#E05C3A]" : "text-[#2EAF7D]";

  const content = CONTENT[type][status];

  // Model Name Label
  const modelName =
    type === "DROPOUT"
      ? "DROPOUT RISK"
      : type === "PREGNANCY"
      ? "PREGNANCY RISK"
      : "OLDER INDIVIDUAL EXPOSURE";

  // Icons mapping
  const IconComponent =
    type === "DROPOUT" ? (
      <GraduationIcon className="w-[26px] h-[26px]" />
    ) : type === "PREGNANCY" ? (
      <HealthCrossIcon className="w-[26px] h-[26px]" />
    ) : (
      <ShieldIcon className="w-[26px] h-[26px]" />
    );

  return (
    <div
      className={`relative w-full rounded-[20px] transition-all duration-300 ease-in-out border-[1.5px] ${borderColor} ${
        isOpen
          ? "shadow-[0_4px_20px_rgba(0,0,0,0.10)] -translate-y-[1px]"
          : "shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)] hover:-translate-y-[1px]"
      } overflow-hidden`}
    >
      {/* HEADER (Collapsed state) */}
      <div
        onClick={onToggle}
        className={`w-full ${bgTint} p-[20px] cursor-pointer flex items-center justify-between z-10 relative`}
      >
        <div className="flex items-center gap-4 flex-1">
          {/* LEFT - Icon */}
          <div
            className={`w-[52px] h-[52px] shrink-0 rounded-full ${iconBg} ${iconColor} flex items-center justify-center`}
          >
            {IconComponent}
          </div>

          {/* CENTER - Text Block */}
          <div className="flex flex-col flex-1 pr-2">
            <span className="font-medium text-[12px] text-[#5A6473] tracking-[0.05em] uppercase mb-1">
              {modelName}
            </span>
            <h3 className="font-bold text-[18px] md:text-[20px] text-[#1A1A2E] leading-tight mb-1">
              {content.label}
            </h3>
            <p className="font-normal text-[13px] text-[#5A6473] leading-[1.4]">
              {content.desc}
            </p>
          </div>
        </div>

        {/* RIGHT - Status Badge + Chevron */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span
            className={`${badgeBg} border ${badgeBorder} ${badgeText} font-semibold text-[12px] px-3 py-1 rounded-[20px] whitespace-nowrap`}
          >
            {isHigh ? "At Risk" : "Low Risk"}
          </span>
          <div
            className={`w-6 h-6 flex items-center justify-center text-[#5A6473] transition-transform duration-250 ease-in-out ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <ChevronDownIcon className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* EXPANDED AREA */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden bg-white">
          <div className={`p-[20px] pb-[24px] border-t border-[${borderColor}]`}>
            {/* WHAT THIS MEANS */}
            <div className="mb-5">
              <h4 className="font-bold text-[13px] text-[#1A1A2E] uppercase tracking-[0.04em] mb-2">
                What This Means
              </h4>
              <p className="font-normal text-[14px] text-[#5A6473] leading-[1.6]">
                {content.meaning}
              </p>
            </div>

            {/* WHAT YOU CAN DO */}
            <div>
              <h4 className="font-bold text-[13px] text-[#1A1A2E] uppercase tracking-[0.04em] mb-3">
                What You Can Do
              </h4>
              <div className="flex flex-col gap-3">
                {content.actions.map((action, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div
                      className={`w-[32px] h-[32px] shrink-0 rounded-full flex items-center justify-center ${
                        isHigh
                          ? "bg-[#FEF0EB] text-[#E05C3A]"
                          : "bg-[#E8F8F2] text-[#2EAF7D]"
                      } [&>svg]:w-4 [&>svg]:h-4`}
                    >
                      {action.icon}
                    </div>
                    <span className="font-normal text-[14px] text-[#1A1A2E] leading-[1.4] mt-1.5">
                      {action.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTACT STRIP (High Risk Only) */}
            {isHigh && (
              <div className="mt-5 bg-[#FEF0EB] border border-[#F4B89A] rounded-[10px] p-[14px] px-[16px] flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <PhoneIcon className="w-5 h-5 text-[#E05C3A] shrink-0" />
                  <div>
                    <h5 className="font-semibold text-[13px] text-[#1A1A2E]">
                      Need immediate support?
                    </h5>
                    <p className="font-normal text-[12px] text-[#5A6473]">
                      Hope Springs Health Foundation Uganda
                    </p>
                  </div>
                </div>
                <button className="bg-[#E05C3A] hover:bg-[#C44A28] text-white font-semibold text-[12px] px-4 py-2 rounded-[8px] transition-colors whitespace-nowrap md:w-auto w-full">
                  Get Help →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN PAGE
// ============================================================================
export default function ResultsPage() {
  const { answers } = useAssessmentStore();

  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [mounted,      setMounted]      = useState(false);
  const [drawCheck,    setDrawCheck]    = useState(false);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState<string | null>(null);
  const [results,      setResults]      = useState<RiskCardData[]>([]);

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setDrawCheck(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Run models on mount
  useEffect(() => {
    async function predict() {
      try {
        setLoading(true);

        const predictions = await runAllModels(answers);
        const { dropoutStatus, pregnancyStatus, exposureStatus } =
          mapToRiskStatus(
            predictions.dropout,
            predictions.pregnancy,
            predictions.sugardaddy
          );

        setResults([
          { id: "1", type: "DROPOUT",   status: dropoutStatus   },
          { id: "2", type: "PREGNANCY", status: pregnancyStatus },
          { id: "3", type: "EXPOSURE",  status: exposureStatus  },
        ]);
      } catch (err) {
        console.error("Prediction error:", err);
        setError(
          "Could not generate your results. Please check your connection and try again."
        );
      } finally {
        setLoading(false);
      }
    }
    predict();
  }, [answers]);

  const handleToggle = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };


  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F8FB] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-[#1B9DC8] border-t-transparent rounded-full animate-spin" />
        <p className="font-medium text-[#5A6473]">
          Generating your report...
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#F4F8FB] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center border border-[#DDE4EA] shadow-sm">
          <p className="text-[#E05C3A] font-semibold text-[16px] mb-2">
            Something went wrong
          </p>
          <p className="text-[#5A6473] text-[14px] mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#1B9DC8] text-white font-semibold px-6 py-3 rounded-[10px] hover:bg-[#126E8E] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Derive summary badge values from results
  const dropoutResult    = results.find((r) => r.type === "DROPOUT");
  const pregnancyResult  = results.find((r) => r.type === "PREGNANCY");
  const exposureResult   = results.find((r) => r.type === "EXPOSURE");

  const summaryBadge = {
    dropout: {
      label:  dropoutResult?.status === "LOW" ? "Inschool"    : "At Risk",
      color:  dropoutResult?.status === "LOW" ? "#2EAF7D"      : "#E05C3A",
    },
    pregnancy: {
      label:  pregnancyResult?.status === "LOW" ? "No Risk"   : "At Risk",
      color:  pregnancyResult?.status === "LOW" ? "#2EAF7D"   : "#E05C3A",
    },
    exposure: {
      label:  exposureResult?.status === "LOW" ? "No Exposure" : "Exposed",
      color:  exposureResult?.status === "LOW" ? "#2EAF7D"     : "#E05C3A",
    },
  };

  return (
    <div className="min-h-screen bg-[#F4F8FB] font-sans selection:bg-[#1B9DC8] selection:text-white flex flex-col">
      {/* ADD CUSTOM ANIMATIONS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scaleInSpring {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale-spring {
          animation: scaleInSpring 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .draw-stroke {
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
          transition: stroke-dashoffset 400ms ease-out;
        }
        .draw-stroke.drawn {
          stroke-dashoffset: 0;
        }
      `}} />

      {/* 1. TOP NAVIGATION BAR */}
      <nav className="w-full bg-white h-[56px] md:h-[64px] flex items-center px-5 md:px-6 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1200px] mx-auto w-full flex justify-between items-center">
          {/* Logo */}
          <div className="flex flex-col w-[120px] cursor-pointer">
            <span className="text-[#1B9DC8] font-bold text-lg leading-none">HSH</span>
            <span className="text-[#1A1A2E] text-[10px] mt-[2px] leading-tight">
              Hope Springs Health
            </span>
          </div>
          {/* Start Over Button */}
          <Link
            href="/assessment/about-you"
            className="border border-[#1B9DC8] text-[#1B9DC8] hover:bg-[#D6F0F8] transition-colors rounded-lg px-4 min-h-[44px] flex items-center justify-center text-sm font-medium"
          >
            Start Over
          </Link>
        </div>
      </nav>

      {/* 2. COMPLETION HEADER */}
      <header className="w-full bg-gradient-to-br from-[#1A1A2E] to-[#126E8E] px-5 py-[36px] md:px-6 md:py-[48px] flex flex-col items-center justify-center text-center relative z-0">
        <div className="max-w-[560px] w-full flex flex-col items-center">
          
          {/* Animated Checkmark */}
          <div className={`w-[72px] h-[72px] rounded-full bg-white/15 flex items-center justify-center mb-5 ${mounted ? 'animate-scale-spring' : 'opacity-0 scale-0'}`}>
            <CheckmarkIcon className={`w-[36px] h-[36px] text-white draw-stroke ${drawCheck ? 'drawn' : ''}`} />
          </div>

          <h1 className="font-bold text-[26px] md:text-[32px] text-white mb-3">
            Your Results Are Ready
          </h1>
          <p className="font-normal text-[16px] text-white/85 max-w-[400px] leading-[1.6]">
            Based on your answers, here is your personalised risk assessment.
          </p>
          <div className="mt-3 font-normal text-[12px] text-white/55 leading-snug">
            Generated on {today} <br className="md:hidden" />
            <span className="hidden md:inline"> · </span> Stored privately on this device
          </div>
        </div>
      </header>

      {/* 3. OVERALL SUMMARY BADGE */}
      <div className="w-full px-5 md:px-6 relative z-10 flex justify-center -mt-[32px] mb-6">
        <div className="w-full max-w-[680px] bg-white rounded-[20px] p-[20px] md:px-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
          <div className="flex flex-row items-stretch justify-between h-full">
            
            {/* Column 1: Dropout */}
            <div className="flex flex-col items-center text-center flex-1">
              <div 
                className="w-3 h-3 rounded-full mb-2" 
                style={{ backgroundColor: summaryBadge.dropout.color }}
              ></div>
              <span className="font-bold text-[14px] text-[#1A1A2E] mb-1">
                {summaryBadge.dropout.label}
              </span>
              <span className="font-normal text-[11px] text-[#5A6473] tracking-[0.04em] uppercase">
                DROPOUT
              </span>
            </div>

            <div className="w-[1px] bg-[#DDE4EA] mx-1 md:mx-4"></div>

            {/* Column 2: Pregnancy */}
            <div className="flex flex-col items-center text-center flex-1">
              <div 
                className="w-3 h-3 rounded-full mb-2" 
                style={{ backgroundColor: summaryBadge.pregnancy.color }}
              ></div>
              <span className="font-bold text-[14px] text-[#1A1A2E] mb-1">
                {summaryBadge.pregnancy.label}
              </span>
              <span className="font-normal text-[11px] text-[#5A6473] tracking-[0.04em] uppercase">
                PREGNANCY
              </span>
            </div>

            <div className="w-[1px] bg-[#DDE4EA] mx-1 md:mx-4"></div>

            {/* Column 3: Exposure */}
            <div className="flex flex-col items-center text-center flex-1">
              <div 
                className="w-3 h-3 rounded-full mb-2" 
                style={{ backgroundColor: summaryBadge.exposure.color }}
              ></div>
              <span className="font-bold text-[14px] text-[#1A1A2E] mb-1 leading-tight md:leading-normal">
                {summaryBadge.exposure.label}
              </span>
              <span className="font-normal text-[11px] text-[#5A6473] tracking-[0.04em] uppercase text-center w-full">
                OLDER EXPOSURE
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* 4. RESULTS SECTION HEADING */}
      <section className="w-full px-5 md:px-6 pt-2 pb-4 flex justify-center">
        <div className="w-full max-w-[680px]">
          <h2 className="font-bold text-[22px] text-[#1A1A2E] mb-1">Your Detailed Report</h2>
          <p className="font-normal text-[14px] text-[#5A6473]">
            Tap any card to learn more and see recommended next steps.
          </p>
        </div>
      </section>

      {/* 5. THREE RISK CARDS */}
      <section className="w-full px-5 md:px-6 pb-6 flex justify-center">
        <div className="w-full max-w-[680px] flex flex-col gap-[16px]">
          {results.map((result, idx) => (
            <div 
              key={result.id} 
              className={`transition-all duration-500 ease-out fill-mode-forwards opacity-0 translate-y-5`}
              style={{ animation: `fadeSlideUp 500ms ease-out ${400 + (idx * 150)}ms forwards` }}
            >
              <RiskCard
                data={result}
                isOpen={expandedCard === result.id}
                onToggle={() => handleToggle(result.id)}
              />
            </div>
          ))}
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}} />
      </section>

      {/* 6. OVERALL WELLBEING MESSAGE */}
      <section className="w-full px-5 md:px-6 pt-2 pb-6 flex justify-center">
        <div className="w-full max-w-[680px] bg-gradient-to-br from-[#1B9DC8] to-[#2EAF7D] rounded-[20px] p-[28px] md:px-[24px] flex flex-col items-center text-center shadow-[0_4px_20px_rgba(46,175,125,0.15)]">
          <div className="w-[52px] h-[52px] rounded-full bg-white/20 flex items-center justify-center mb-4">
            <HeartPulseIcon className="w-[32px] h-[32px] text-white" />
          </div>
          <h3 className="font-bold text-[20px] text-white mb-2.5">Remember</h3>
          <p className="font-normal text-[14px] text-white/90 leading-[1.7] max-w-[480px]">
            This assessment is a tool to help you understand your situation — not a verdict. Your future is shaped by your choices, your support network, and the resources available to you. You are not alone.
          </p>
        </div>
      </section>

      {/* 7. ACTION BUTTONS ROW */}
      <section className="w-full px-5 md:px-6 py-6 pb-12 flex justify-center mt-auto">
        <div className="w-full max-w-[680px]">
          <Link
            href="/assessment/about-you"
            className="w-full bg-transparent border-[1.5px] border-[#1B9DC8] text-[#1B9DC8] hover:bg-[#D6F0F8] font-semibold text-[15px] p-[16px] rounded-[10px] flex items-center justify-center transition-colors"
          >
            Start a New Assessment
          </Link>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="w-full bg-[#1A1A2E] px-6 py-[40px] border-t border-white/10 mt-auto">
        <div className="max-w-[1200px] mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col">
            <span className="text-white font-bold text-xl leading-none mb-1">HSH</span>
            <span className="text-white/70 text-[12px] leading-tight">
              Hope Springs Health Foundation
            </span>
          </div>
          <div className="flex flex-col md:text-right text-left">
            <span className="text-white/50 text-[12px] mb-1">
              © 2026 Hope Springs Health Foundation Uganda
            </span>
            <span className="text-white/50 text-[12px]">
              Powered by MUWALA · Built with care
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}