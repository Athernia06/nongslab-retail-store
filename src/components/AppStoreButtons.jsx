import { Apple, Play } from 'lucide-react'

const STORES = [
  {
    id: 'appstore',
    icon: Apple,
    top: 'Download on the',
    bottom: 'App Store',
  },
  {
    id: 'googleplay',
    icon: Play,
    top: 'Get it on',
    bottom: 'Google Play',
  },
]

export default function AppStoreButtons() {
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row">
      {STORES.map(({ id, icon: Icon, top, bottom }) => (
        <a
          key={id}
          href="#"
          aria-label={`${top} ${bottom}`}
          className="inline-flex items-center gap-2.5 rounded-lg bg-ink-900 px-4 py-2 text-white transition hover:bg-ink-700 active:scale-95"
        >
          <Icon size={22} fill="currentColor" strokeWidth={0} />
          <span className="text-left leading-tight">
            <span className="block text-[10px] font-semibold opacity-80">
              {top}
            </span>
            <span className="block text-sm font-extrabold">{bottom}</span>
          </span>
        </a>
      ))}
    </div>
  )
}
