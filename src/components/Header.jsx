import { useEffect, useState } from 'react'
import { MapPin, Menu, X, Clock3 } from 'lucide-react'
import { stores } from '../data/stores.js'

const NAV_LINKS = [
  { href: '#menu', label: 'Menu' },
  { href: '#stores', label: 'Stores' },
  { href: '#about', label: 'About' },
]

export default function Header({ storeId, onStoreChange }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const activeStore = stores.find((store) => store.id === storeId)

  const handleNavClick = () => setMenuOpen(false)

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled
          ? 'border-ink-200 bg-white/95 shadow-sm backdrop-blur-md'
          : 'border-transparent bg-white'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink-700 hover:bg-ink-50 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <a href="#" className="flex items-center gap-2.5">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600">
            <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6">
              <path d="M8 3a3 3 0 0 0-3 3H4.5A1.5 1.5 0 0 0 3 7.5v6A1.5 1.5 0 0 0 4.5 15H5v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-3h.5a1.5 1.5 0 0 0 1.5-1.5v-6A1.5 1.5 0 0 0 19.5 7H18a3 3 0 0 0-3-3H8Zm10 9v-.5H5.5V12H5v1.5h.5v.5h13v-.5h.5V12h-.5Zm-3 .5h2.5a.5.5 0 0 1 0 1H15a.5.5 0 0 1 0-1Zm-8 0h2.5a.5.5 0 0 1 0 1H7a.5.5 0 0 1 0-1Z" />
            </svg>
          </span>
          <span className="text-left leading-tight">
            <span className="block text-base font-extrabold tracking-tight text-ink-900">
              FamilyStore
            </span>
            <span className="block text-[10px] font-bold tracking-widest text-brand-600">
              Retail Demo
            </span>
          </span>
        </a>

        <div className="mx-auto hidden max-w-xs items-center gap-2 rounded-lg border border-ink-200 bg-ink-50 px-3.5 py-2 md:flex">
          <MapPin size={16} className="shrink-0 text-brand-600" />
          <select
            value={storeId}
            onChange={(event) => onStoreChange(event.target.value)}
            aria-label="Select pickup store"
            className="w-full cursor-pointer truncate border-0 bg-transparent text-sm font-semibold text-ink-700 focus:outline-none"
          >
            {stores.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </select>
        </div>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm font-semibold text-ink-500 transition hover:bg-brand-50 hover:text-brand-700"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#menu"
          className="ml-auto inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700 active:scale-95 md:ml-2"
        >
          View menu
        </a>
      </div>

      {menuOpen && (
        <div className="border-t border-ink-200 bg-white px-4 pt-3 pb-5 md:hidden">
          <label
            htmlFor="mobile-store"
            className="mb-1.5 block text-xs font-bold text-ink-500"
          >
            Pickup store
          </label>
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-ink-200 bg-ink-50 px-3 py-2.5">
            <MapPin size={16} className="shrink-0 text-brand-600" />
            <select
              id="mobile-store"
              value={storeId}
              onChange={(event) => onStoreChange(event.target.value)}
              className="w-full cursor-pointer bg-transparent text-sm font-semibold text-ink-700 focus:outline-none"
            >
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>
          <nav className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-ink-700 hover:bg-brand-50 hover:text-brand-700"
              >
                {link.label}
              </a>
            ))}
          </nav>
          {activeStore && (
            <p className="mt-2 flex items-center gap-1.5 px-3 text-xs text-ink-500">
              <Clock3 size={13} className="text-brand-600" />
              {activeStore.name} · {activeStore.hours}
            </p>
          )}
        </div>
      )}
    </header>
  )
}
