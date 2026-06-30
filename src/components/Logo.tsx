export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#10B981"/>
      <path d="M20 8C13.373 8 8 13.373 8 20C8 26.627 13.373 32 20 32C26.627 32 32 26.627 32 20C32 13.373 26.627 8 20 8Z" fill="white" fillOpacity="0.15"/>
      <path d="M20 12V14M20 26V28M14 20H12M28 20H26" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M17 17.5C17 16.119 18.119 15 19.5 15H20.5C21.881 15 23 16.119 23 17.5C23 18.881 21.881 20 20.5 20H19.5C18.119 20 17 21.119 17 22.5C17 23.881 18.119 25 19.5 25H20.5C21.881 25 23 23.881 23 22.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}