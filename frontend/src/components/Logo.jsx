// Logo "TaskFlow" avec cœur rose
export default function Logo({ size = 'md', variant = 'dark' }) {
  const sizes = {
    sm: { text: 'text-lg', heart: 'text-base', wrap: 'gap-1' },
    md: { text: 'text-2xl', heart: 'text-xl', wrap: 'gap-1.5' },
    lg: { text: 'text-4xl', heart: 'text-3xl', wrap: 'gap-2' },
  }
  const s = sizes[size] || sizes.md
  
  const textColor = variant === 'light' ? 'text-white' : 'text-gray-900'

  return (
    <div className={`flex items-center ${s.wrap}`}>
      <span className={`font-extrabold tracking-tight ${textColor} ${s.text}`}>
        Task
      </span>
      <span className={`${s.heart} leading-none select-none`}>🩷</span>
      <span className={`font-extrabold tracking-tight ${textColor} ${s.text}`}>
        Flow
      </span>
    </div>
  )
}

