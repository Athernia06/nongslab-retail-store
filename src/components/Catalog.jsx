import { useMemo, useState } from 'react'
import {
  Coffee,
  Flame,
  IceCreamCone,
  Plus,
  Search,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react'
import { categories, formatIDR, products } from '../data/products.js'

const CATEGORY_ICONS = {
  Sparkles,
  Coffee,
  Flame,
  UtensilsCrossed,
  IceCreamCone,
}

function ProductCard({ item, onAdd }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-900/8">
      <div
        className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${item.tint}`}
      >
        <span className="text-5xl transition-transform duration-300 group-hover:scale-110">
          {item.emoji}
        </span>
        <span className="absolute top-3 left-3 rounded-full bg-ink-900/80 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-white">
          {item.badge}
        </span>
        <span className="absolute right-3 bottom-3 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] font-bold text-ink-700">
          {item.kcal} kcal
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm leading-snug font-bold text-ink-900 sm:text-base">
          {item.name}
        </h3>
        <p className="mt-1.5 line-clamp-1 text-xs text-ink-400">{item.desc}</p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <span className="font-mono text-base font-bold text-brand-700">
            {formatIDR(item.price)}
          </span>
          <button
            type="button"
            onClick={() => onAdd(item)}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-brand-600/25 transition hover:bg-brand-700 active:scale-95"
            aria-label={`Add ${item.name} to order`}
          >
            <Plus size={14} />
            Add to Order
          </button>
        </div>
      </div>
    </article>
  )
}

export default function Catalog({ onAdd }) {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return products.filter((product) => {
      const matchCategory = category === 'all' || product.category === category
      const matchQuery =
        needle === '' || product.name.toLowerCase().includes(needle)
      return matchCategory && matchQuery
    })
  }, [category, query])

  return (
    <section id="menu" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="flex flex-col gap-2 text-center">
        <span className="font-mono text-xs font-bold tracking-widest text-brand-600 uppercase">
          Ready-to-Eat Menu
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          Fresh today, served in minutes
        </h2>
        <p className="mx-auto max-w-lg text-sm text-ink-500 sm:text-base">
          Everything is prepared in-store and refreshed throughout the day.
          Pick a category to jump in.
        </p>
      </div>

      <div className="sticky top-16 z-30 -mx-4 mt-8 bg-ink-50/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="relative mb-2.5">
          <Search
            size={16}
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-400"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search fresh eats, coffee, snacks..."
            aria-label="Search menu"
            className="w-full rounded-full border border-ink-200 bg-white py-2.5 pr-4 pl-10 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none"
          />
        </div>
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 py-0.5">
          {categories.map((item) => {
            const Icon = CATEGORY_ICONS[item.icon] ?? Sparkles
            const isActive = item.id === category
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                aria-pressed={isActive}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold whitespace-nowrap transition sm:text-sm ${
                  isActive
                    ? 'border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-600/25'
                    : 'border-ink-200 bg-white text-ink-500 hover:border-brand-300 hover:text-brand-700'
                }`}
              >
                <Icon size={15} />
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.id} item={product} onAdd={onAdd} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-3xl border border-dashed border-ink-200 bg-white px-6 py-16 text-center">
          <p className="text-3xl">🔍</p>
          <p className="mt-3 font-bold text-ink-700">No items found</p>
          <p className="mt-1 text-sm text-ink-500">
            Try a different keyword or category.
          </p>
        </div>
      )}
    </section>
  )
}
