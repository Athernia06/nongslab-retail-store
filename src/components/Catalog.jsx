import { useMemo, useState } from 'react'
import { Search, Smartphone } from 'lucide-react'
import menuData from '../data/products.json'
import AppStoreButtons from './AppStoreButtons.jsx'

const formatIDR = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)

export default function Catalog() {
  const [query, setQuery] = useState('')

  const groups = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (needle === '') return menuData.categories
    return menuData.categories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          item.name.toLowerCase().includes(needle),
        ),
      }))
      .filter((category) => category.items.length > 0)
  }, [query])

  return (
    <section id="menu" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="flex flex-col gap-2 text-center">
        <span className="text-xs font-bold tracking-widest text-brand-600">
          FamilyMart Menu
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          Fresh today, served in minutes
        </h2>
        <p className="mx-auto max-w-lg text-sm text-ink-500 sm:text-base">
          Everything is prepared in-store and refreshed throughout the day.
          Order via our mobile app for delivery or pickup.
        </p>
      </div>

      <div className="relative mx-auto mt-8 max-w-md">
        <Search
          size={16}
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-400"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search the menu..."
          aria-label="Search menu"
          className="w-full rounded-lg border border-ink-200 bg-white py-2.5 pr-4 pl-10 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none"
        />
      </div>

      {groups.length > 0 ? (
        <div className="mx-auto mt-12 max-w-2xl">
          {groups.map((category) => (
            <section key={category.id} className="border-t border-ink-100 py-8 first:border-t-0 first:pt-0">
              <h3 className="text-lg font-extrabold tracking-tight text-ink-900">
                {category.label}
              </h3>
              <ul className="mt-4 space-y-3">
                {category.items.map((item) => (
                  <li key={item.name} className="flex items-baseline gap-3">
                    <span className="text-sm font-semibold text-ink-700">
                      {item.name}
                    </span>
                    <span
                      aria-hidden
                      className="min-w-6 flex-1 border-b border-dotted border-ink-200"
                    />
                    <span className="text-sm font-bold whitespace-nowrap text-brand-700">
                      {formatIDR(item.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border-2 border-dashed border-cream bg-white px-6 py-16 text-center">
          <Search size={28} className="mx-auto text-ink-400" />
          <p className="mt-3 font-bold text-ink-700">No items found</p>
          <p className="mt-1 text-sm text-ink-500">Try a different keyword.</p>
        </div>
      )}

      <div className="mt-12 flex flex-col items-center gap-3 rounded-2xl border border-brand-200 bg-brand-50 px-6 py-8 text-center sm:px-10">
        <h3 className="text-xl font-extrabold tracking-tight text-ink-900 sm:text-2xl">
          Order via our mobile app
        </h3>
        <p className="max-w-md text-sm text-ink-500">
          Delivery and pickup are available in the FamilyStore app. Download it
          to order from this menu.
        </p>
        <AppStoreButtons />
      </div>

      <p className="mt-6 inline-flex items-center gap-1.5 text-xs text-ink-400">
        <Smartphone size={13} className="text-brand-500" />
        Menu data generated {new Date(menuData.generatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
      </p>
    </section>
  )
}
