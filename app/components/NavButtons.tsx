// app/components/NavButtons.tsx
import Link from 'next/link'

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

export const NextButton = ({
  href,
  enabled,
}: {
  href: string
  enabled: boolean
}) => {
  if (enabled) {
    return (
      <Link
        href={href}
        className="flex items-center gap-2 font-semibold text-[15px] px-7 py-3 rounded-[10px] min-h-[44px] transition-all duration-200 bg-[#1B9DC8] hover:bg-[#126E8E] text-white shadow-sm"
      >
        <span>Next</span>
        <ArrowRightIcon />
      </Link>
    )
  }
  return (
    <span className="flex items-center gap-2 font-semibold text-[15px] px-7 py-3 rounded-[10px] min-h-[44px] bg-[#DDE4EA] text-[#5A6473] cursor-not-allowed select-none">
      <span>Next</span>
      <ArrowRightIcon />
    </span>
  )
}

export const BackButton = ({ href }: { href: string }) => (
  <Link
    href={href}
    className="flex items-center gap-2 text-[#5A6473] hover:text-[#1A1A2E] font-medium text-[15px] transition-colors min-h-[44px] px-2 -ml-2"
  >
    <ArrowLeftIcon />
    <span>Back</span>
  </Link>
)

export const DisabledBackButton = () => (
  <span className="flex items-center gap-2 text-[#DDE4EA] font-medium text-[15px] min-h-[44px] px-2 -ml-2 cursor-not-allowed select-none">
    <ArrowLeftIcon />
    <span>Back</span>
  </span>
)