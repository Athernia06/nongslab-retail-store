import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flame,
  Smartphone,
} from 'lucide-react'
import { PROMO_BANNERS, HERO_STATS } from '../data/promos.js'
import AppStoreButtons from './AppStoreButtons.jsx'

const ROTATE_MS = 5000

export default function Hero({ onExplore }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const banners = PROMO_BANNERS
  const total = banners.length

  const go = useCallback(
    (dir) => setActive((current) => (current + dir + total) % total),
    [total],
  )

  useEffect(() => {
    if (paused) return undefined
    const id = window.setInterval(
      () => setActive((current) => (current + 1) % total),
      ROTATE_MS,
    )
    return () => window.clearInterval(id)
  }, [paused, total])

  const banner = useMemo(() => banners[active], [banners, active])

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 pt-10 pb-14 sm:px-6 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12 lg:pb-24">
        <div className="animate-fade-slide text-center lg:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-bold tracking-wide text-brand-700">
            <Flame size={14} />
            Ready-to-eat · fresh every 4 hours
          </span>
          <h1 className="mt-5 text-4xl leading-[1.08] font-extrabold tracking-tight text-balance text-ink-900 sm:text-5xl lg:text-6xl">
            Grab fresh eats,{' '}
            <span className="text-brand-700">skip the queue</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-ink-500 sm:text-lg lg:mx-0">
            Coffee, hot snacks, oden, bento & ice cream — browse the catalog
            here, then order via our mobile app for delivery or pickup.
          </p>

          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <button
              type="button"
              onClick={onExplore}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-7 py-3.5 text-base font-bold text-white transition hover:bg-brand-700 active:scale-95 sm:w-auto"
            >
              Explore the menu
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
            <a
              href="#stores"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-ink-200 bg-white px-7 py-3.5 text-base font-bold text-ink-700 transition hover:border-brand-300 hover:text-brand-700 sm:w-auto"
            >
              Find a store
            </a>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3 lg:items-start">
            <p className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-ink-500">
              <Smartphone size={14} className="text-brand-600" />
              Order via our mobile app for delivery &amp; pickup
            </p>
            <AppStoreButtons />
          </div>

          <dl className="mx-auto mt-9 grid max-w-md grid-cols-3 divide-x divide-ink-200 lg:mx-0">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="px-2 text-center lg:px-4 lg:text-left">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-xl font-extrabold text-ink-900 sm:text-2xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-[11px] leading-tight font-medium text-ink-400">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="animate-fade-slide"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="relative overflow-hidden rounded-2xl border border-ink-100 shadow-lg shadow-ink-900/5">
            <div
              key={banner.id}
              className={`animate-fade-slide relative flex min-h-[19rem] flex-col justify-between p-6 text-white sm:min-h-[22rem] sm:p-8 ${banner.bg}`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`rounded-md px-3 py-1.5 text-xs font-bold tracking-wider ${banner.chip}`}
                >
                  {banner.chipLabel}
                </span>
                <span
                  aria-hidden
                  className="text-5xl drop-shadow-lg sm:text-6xl"
                >
                  {banner.emoji}
                </span>
              </div>

              <div className="mt-6 sm:mt-10">
                <p className="text-xs font-bold tracking-widest opacity-80">
                  {banner.eyebrow}
                </p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {banner.title}
                </h2>
                <p className="mt-2 text-sm opacity-90 sm:text-base">
                  {banner.subtitle}
                </p>
                <button
                  type="button"
                  onClick={onExplore}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-ink-900 transition hover:bg-ink-100 active:scale-95"
                >
                  <ArrowRight size={16} />
                  Browse menu
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2">
              {banners.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Show promo ${index + 1}`}
                  aria-current={index === active}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === active
                      ? 'w-8 bg-brand-600'
                      : 'w-2.5 bg-ink-200 hover:bg-ink-400'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous promo"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 bg-white text-ink-500 transition hover:border-brand-300 hover:text-brand-700"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next promo"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 bg-white text-ink-500 transition hover:border-brand-300 hover:text-brand-700"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
