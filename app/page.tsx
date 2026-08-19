'use client';

import React from 'react';
import Link from 'next/link';
//import {useRouter} from 'next/navigation';
import { useEffect } from 'react';

// ============================================================================
// SVG ICONS
// ============================================================================
const LockIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ClipboardCheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  </svg>
);

const BrainIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);

const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
  </svg>
);

const WifiOffIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="1" x2="23" y1="1" y2="23" />
    <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
    <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
    <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
    <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <line x1="12" x2="12.01" y1="20" y2="20" />
  </svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);


// ============================================================================
// PAGE COMPONENT
// ============================================================================
export default function MuwalaLandingPage() {
  /*
  const router = useRouter();

  const handleStart = () => {
    router.push('/assessment/about-you')
  }  */

  // app/page.tsx — add this useEffect

useEffect(() => {
  // Pre-fetch all files needed for offline results page
  const filesToCache = [
    // ONNX models
    '/models/onnx/dropout_model.onnx',
    '/models/onnx/pregnancy_model.onnx',
    '/models/onnx/sugardaddy_model.onnx',
    // Encoding JSONs
    '/models/encodings/dropout_encoding.json',
    '/models/encodings/pregnancy_encoding.json',
    '/models/encodings/sugardaddy_encoding.json',
    // WASM runtime files
    '/onnx/ort-wasm-simd-threaded.wasm',
    '/onnx/ort-wasm-simd-threaded.jsep.wasm',
    '/onnx/ort-wasm-simd-threaded.mjs',
  ]

  filesToCache.forEach((url) => {
    fetch(url, { cache: 'force-cache' }).catch(() => {
      // Silently fail — user is offline on first load
    })
  })
}, [])
  return (
    <main className="min-h-screen font-sans selection:bg-[#1B9DC8] selection:text-white flex flex-col">
      
      {/* 1. NAVIGATION BAR */}
      <nav className="w-full bg-white border-b border-[#DDE4EA] h-[56px] md:h-[64px] flex items-center px-6">
        <div className="max-w-[1200px] mx-auto w-full flex justify-between items-center">
          {/* Logo */}
          <div className="flex flex-col w-[120px]">
            <span className="text-[#1B9DC8] font-bold text-lg leading-none">HSH</span>
            <span className="text-[#1A1A2E] text-[10px] mt-[2px] leading-tight">Hope Springs Health</span>
          </div>
          
          {/* CTA */}
          <button className="border border-[#1B9DC8] text-[#1B9DC8] hover:bg-[#D6F0F8] transition-colors rounded-lg px-4 min-h-[44px] flex items-center justify-center text-sm font-medium">
            Learn More
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="w-full bg-gradient-to-b from-[#F4F8FB] to-[#D6F0F8] px-6 py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-8">
          
          {/* Left Column - Text */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2">
            <span className="bg-[#D6F0F8] text-[#126E8E] font-medium text-[12px] uppercase tracking-[0.05em] px-[14px] py-[6px] rounded-full mb-6">
              CONFIDENTIAL &middot; FREE &middot; TAKES 5 MINUTES
            </span>
            
            <h1 className="text-[#1A1A2E] font-bold text-[30px] md:text-[44px] leading-[1.2] mb-4">
              Understand Your <br className="hidden md:block" />
              Health Risks Today
            </h1>
            
            <p className="text-[#5A6473] text-[15px] md:text-[17px] leading-[1.6] md:leading-[1.7] max-w-[480px] mb-8">
              MUWALA is a private, judgment-free assessment designed for young women. Answer a few questions and receive a personalised risk report instantly and offline.
            </p>
            
            <Link
              href="/assessment/about-you"
              className="w-full md:w-auto bg-[#1B9DC8] hover:bg-[#126E8E] text-white font-semibold text-[16px] px-8 py-4 rounded-[10px] min-h-[44px] flex justify-center items-center gap-2 transition-colors mb-4 shadow-sm">
              Start Assessment &rarr;
            </Link>
            
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#5A6473] text-[13px]">
              <LockIcon className="w-4 h-4 text-[#2EAF7D]" />
              <span>Your answers are private and never shared.</span>
            </div>
          </div>

          {/* Right Column - Illustration Placeholder */}
          <div className="w-full max-w-[280px] md:max-w-[480px] md:w-1/2 flex justify-center md:justify-end">
            <div className="w-full aspect-square bg-[#1B9DC8]/10 rounded-full flex items-center justify-center border-2 border-dashed border-[#1B9DC8]/30">
              <span className="text-[#1B9DC8] font-medium text-sm text-center px-4">
                Warm African flat vector illustration <br />(Replace with Image)
              </span>
            </div>
          </div>
          
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="w-full bg-white px-6 py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto w-full">
          {/* Section Heading */}
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-[#1A1A2E] font-bold text-[24px] md:text-[32px] mb-3">
              How It Works
            </h2>
            <div className="w-[48px] h-[3px] bg-[#1B9DC8] rounded-full"></div>
          </div>

          {/* Cards Grid */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center">
            
            {/* Card 1 */}
            <div className="flex-1 bg-[#F4F8FB] border border-[#DDE4EA] rounded-[16px] p-8 flex flex-col items-center text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <ClipboardCheckIcon className="w-10 h-10 text-[#1B9DC8] mb-4" />
              <span className="font-bold text-[13px] text-[#1B9DC8] mb-2">01</span>
              <h3 className="text-[#1A1A2E] font-bold text-[18px] mb-3">Answer Questions</h3>
              <p className="text-[#5A6473] text-[15px] leading-[1.6]">
                Complete 6 short sections covering your health, relationships, and awareness. Takes about 5 minutes.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex-1 bg-[#F4F8FB] border border-[#DDE4EA] rounded-[16px] p-8 flex flex-col items-center text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <BrainIcon className="w-10 h-10 text-[#2EAF7D] mb-4" />
              <span className="font-bold text-[13px] text-[#2EAF7D] mb-2">02</span>
              <h3 className="text-[#1A1A2E] font-bold text-[18px] mb-3">AI Analysis</h3>
              <p className="text-[#5A6473] text-[15px] leading-[1.6]">
                Our model — trained on real data from young women in Uganda — analyses your responses instantly.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex-1 bg-[#F4F8FB] border border-[#DDE4EA] rounded-[16px] p-8 flex flex-col items-center text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <ShieldCheckIcon className="w-10 h-10 text-[#1B9DC8] mb-4" />
              <span className="font-bold text-[13px] text-[#1B9DC8] mb-2">03</span>
              <h3 className="text-[#1A1A2E] font-bold text-[18px] mb-3">Get Your Report</h3>
              <p className="text-[#5A6473] text-[15px] leading-[1.6]">
                Receive a private risk report with clear, actionable information. No account needed.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. TRUST & PRIVACY BANNER */}
      <section className="w-full bg-[#1B9DC8] px-6 py-12 text-white mt-auto">
        <div className="max-w-[1200px] mx-auto w-full flex flex-col items-center text-center">
          <h2 className="font-bold text-[28px] mb-10">Built on Trust</h2>
          
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex flex-col items-center gap-3">
              <LockIcon className="w-7 h-7" />
              <span className="font-semibold text-[15px]">100% Confidential</span>
            </div>
            
            <div className="hidden md:block w-px h-[40px] bg-white/30"></div>
            
            <div className="flex flex-col items-center gap-3">
              <WifiOffIcon className="w-7 h-7" />
              <span className="font-semibold text-[15px]">Works Offline</span>
            </div>
            
            <div className="hidden md:block w-px h-[40px] bg-white/30"></div>
            
            <div className="flex flex-col items-center gap-3">
              <HeartIcon className="w-7 h-7" />
              <span className="font-semibold text-[15px]">Built for Ugandan Women</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="w-full bg-[#1A1A2E] px-6 py-10 border-t border-white/10">
        <div className="max-w-[1200px] mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          {/* Footer Left */}
          <div className="flex flex-col">
            <span className="text-white font-bold text-[16px] mb-1">HSH</span>
            <span className="text-white/60 text-[13px] font-regular">
              Hope Springs Health Foundation Uganda
            </span>
          </div>

          {/* Footer Right */}
          <div className="flex flex-col text-white/50 text-[12px] font-regular md:text-right">
            <span>&copy; 2026 Hope Springs Health Foundation Uganda</span>
            <span className="mt-1">Powered by MUWALA &middot; Built with care</span>
          </div>

        </div>
      </footer>
    </main>
  );
}