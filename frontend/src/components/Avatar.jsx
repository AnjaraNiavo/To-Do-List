// Stack d'avatars empilés
const COLORS = [
  'bg-violet-500', 'bg-pink-500', 'bg-sky-500',
  'bg-amber-400', 'bg-emerald-500', 'bg-rose-500',
]

export function Avatar({ initials, color, size = 'sm', img }) {
  const sizes = { xs: 'w-5 h-5 text-[9px]', sm: 'w-7 h-7 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-12 h-12 text-base' }
  const cls = sizes[size] || sizes.sm
  return (
    <div
      className={`${cls} rounded-full border-2 border-white flex items-center justify-center font-semibold text-white flex-shrink-0 ${color || 'bg-violet-500'}`}
      title={initials}
    >
      {initials}
    </div>
  )
}

export function AvatarStack({ names = [], max = 3, size = 'sm' }) {
  const shown = names.slice(0, max)
  const rest  = names.length - shown.length
  return (
    <div className="flex items-center -space-x-2">
      {shown.map((name, i) => (
        <Avatar key={i} initials={name[0] || '?'} color={COLORS[i % COLORS.length]} size={size} />
      ))}
      {rest > 0 && (
        <div className={`${size === 'sm' ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-sm'} rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-gray-600 font-semibold`}>
          +{rest}
        </div>
      )}
    </div>
  )
}
