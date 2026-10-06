import { useState } from 'react'
import {
  CheckCircle2,
  Clock3,
  MapPin,
  Navigation,
  Phone,
  Store,
  XCircle,
} from 'lucide-react'
import { stores } from '../data/stores.js'

function StoreCard({ store }) {
  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border p-5 transition sm:flex-row sm:items-center sm:justify-between ${
        store.isOpen
          ? 'border-ink-200 bg-white shadow-sm hover:border-brand-300 hover:shadow-md'
          : 'border-dashed border-ink-200 bg-white/60'
      }`}
    >
      <div className="flex items-start gap-3.5">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            store.isOpen
              ? 'bg-brand-50 text-brand-600'
              : 'bg-ink-100 text-ink-400'
          }`}
        >
          <Store size={20} />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-bold text-ink-900 sm:text-base">
              {store.name}
            </h3>
            {store.isOpen ? (
              <span className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">
                <CheckCircle2 size={11} />
                Open now
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-md bg-ink-100 px-2 py-0.5 text-[10px] font-bold text-ink-500">
                <XCircle size={11} />
                Closed
              </span>
            )}
          </div>
          <p className="mt-1 flex items-start gap-1.5 text-xs text-ink-500 sm:text-sm">
            <MapPin size={13} className="mt-0.5 shrink-0" />
            {store.address}
          </p>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
            <span className="inline-flex items-center gap-1 font-medium text-ink-700">
              <Navigation size={12} className="text-brand-600" />
              {store.distance} away
            </span>
            <span className="inline-flex items-center gap-1 font-medium text-ink-500">
              <Clock3 size={12} />
              {store.hours}
            </span>
          </p>
        </div>
      </div>

      <div className="flex shrink-0 gap-2 sm:flex-col">
        <button
          type="button"
          disabled={!store.isOpen}
          className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition sm:flex-none ${
            store.isOpen
              ? 'bg-brand-600 text-white hover:bg-brand-700 active:scale-95'
              : 'cursor-not-allowed bg-ink-100 text-ink-400'
          }`}
        >
          <Navigation size={13} />
          {store.isOpen ? 'Set as Pickup' : 'Unavailable'}
        </button>
        <a
          href="tel:+622150000000"
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-ink-200 bg-white px-4 py-2 text-xs font-bold text-ink-700 transition hover:border-brand-300 hover:text-brand-700 sm:flex-none"
        >
          <Phone size={13} />
          Call
        </a>
      </div>
    </article>
  )
}

export default function StoreLocator() {
  const [onlyOpen, setOnlyOpen] = useState(false)
  const visible = onlyOpen ? stores.filter((store) => store.isOpen) : stores
  const openCount = stores.filter((store) => store.isOpen).length

  return (
    <section id="stores" className="bg-wave-50 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-2 text-center">
          <span className="text-xs font-bold tracking-widest text-brand-600">
            Store Locator
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
            {openCount} of {stores.length} stores open near you
          </h2>
          <p className="mx-auto max-w-lg text-sm text-ink-500 sm:text-base">
            Visit a store for fresh eats, or order ahead in the mobile app for
            delivery and pickup.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setOnlyOpen((value) => !value)}
            aria-pressed={onlyOpen}
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-bold transition sm:text-sm ${
              onlyOpen
                ? 'border-brand-600 bg-brand-50 text-brand-700'
                : 'border-ink-200 bg-white text-ink-500 hover:border-brand-300'
            }`}
          >
            <CheckCircle2 size={15} />
            {onlyOpen ? 'Showing open stores' : 'Show open stores only'}
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:gap-4 lg:grid-cols-2">
          {visible.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </div>
    </section>
  )
}
