import { useEffect } from 'react'
import {
  Check,
  Clock3,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Store,
  Trash2,
  X,
  Zap,
} from 'lucide-react'
import { formatIDR } from '../data/products.js'
import { stores } from '../data/stores.js'

export default function CartModal({
  open,
  cartItems,
  subtotal,
  storeId,
  onClose,
  onUpdateQty,
  onRemove,
  onStoreChange,
  onCheckout,
  checkoutState,
  pickupCode,
}) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  useEffect(() => {
    if (open) return
    const trigger = document.querySelector('[data-cart-trigger]')
    if (trigger) trigger.focus()
  }, [open])

  if (!open) return null

  const selectedStore = stores.find((store) => store.id === storeId)
  const serviceFee = subtotal > 0 ? 2000 : 0
  const total = subtotal + serviceFee

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Pickup cart"
    >
      <button
        type="button"
        aria-label="Close cart"
        onClick={onClose}
        className="absolute inset-0 bg-ink-900/45 backdrop-blur-sm"
      />

      <aside className="animate-modal-in relative flex h-full w-full max-w-md flex-col bg-ink-50 shadow-2xl">
        <header className="flex items-center justify-between border-b border-ink-200 bg-white px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <ShoppingBag size={19} />
            </span>
            <div>
              <h2 className="text-base font-extrabold text-ink-900">
                Self-Pickup Express
              </h2>
              <p className="text-xs text-ink-400">
                {cartItems.length} item{cartItems.length === 1 ? '' : 's'} ready
                for pickup
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 transition hover:bg-ink-100 hover:text-ink-900"
          >
            <X size={19} />
          </button>
        </header>

        {checkoutState === 'success' ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700">
              <Check size={30} />
            </span>
            <h3 className="text-xl font-extrabold text-ink-900">
              Order simulated!
            </h3>
            <p className="text-sm text-ink-500">
              Pickup code{' '}
              <span className="font-mono font-bold text-brand-700">
                #FS-{pickupCode}
              </span>{' '}
              is ready at {selectedStore?.name ?? 'your store'}. Show it at the
              express shelf.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-700"
            >
              Back to menu
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ink-100 text-ink-400">
              <ShoppingBag size={28} />
            </span>
            <h3 className="font-bold text-ink-700">Your cart is empty</h3>
            <p className="text-sm text-ink-500">
              Add some fresh eats from the menu and they will show up here.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 rounded-full border-2 border-ink-200 bg-white px-6 py-2.5 text-sm font-bold text-ink-700 transition hover:border-brand-300 hover:text-brand-700"
            >
              Browse menu
            </button>
          </div>
        ) : (
          <>
            <div className="grid flex-1 grid-rows-[auto_1fr_auto] overflow-hidden">
              <div className="border-b border-ink-200 bg-white px-5 py-4">
                <label
                  htmlFor="cart-store"
                  className="mb-1.5 flex items-center gap-1.5 text-xs font-bold tracking-wider text-ink-500 uppercase"
                >
                  <Store size={13} />
                  Pickup store
                </label>
                <select
                  id="cart-store"
                  value={storeId}
                  onChange={(event) => onStoreChange(event.target.value)}
                  className="w-full cursor-pointer rounded-xl border border-ink-200 bg-ink-50 px-3.5 py-2.5 text-sm font-semibold text-ink-900 focus:border-brand-500 focus:outline-none"
                >
                  {stores.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.name} {store.isOpen ? '· Open' : '· Closed'}
                    </option>
                  ))}
                </select>
                {selectedStore && (
                  <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500">
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={12} className="text-brand-600" />
                      {selectedStore.distance}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock3 size={12} className="text-brand-600" />
                      {selectedStore.hours}
                    </span>
                  </p>
                )}
              </div>

              <ul className="divide-y divide-ink-200 overflow-y-auto bg-white px-5">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex gap-3 py-4">
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl ${item.tint}`}
                    >
                      {item.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-ink-900">
                        {item.name}
                      </p>
                      <p className="mt-0.5 font-mono text-xs font-bold text-brand-700">
                        {formatIDR(item.price)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="inline-flex items-center rounded-full border border-ink-200">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.id, -1)}
                            aria-label={`Decrease ${item.name} quantity`}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-7 text-center font-mono text-xs font-bold">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.id, 1)}
                            aria-label={`Increase ${item.name} quantity`}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-ink-500 hover:bg-ink-100"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemove(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-ink-400 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <span className="shrink-0 self-center font-mono text-sm font-bold text-ink-900">
                      {formatIDR(item.price * item.qty)}
                    </span>
                  </li>
                ))}
              </ul>

              <footer className="border-t border-ink-200 bg-white px-5 py-4">
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-ink-500">
                    <dt>Subtotal</dt>
                    <dd className="font-mono font-semibold text-ink-700">
                      {formatIDR(subtotal)}
                    </dd>
                  </div>
                  <div className="flex justify-between text-ink-500">
                    <dt>Pickup service fee</dt>
                    <dd className="font-mono font-semibold text-ink-700">
                      {formatIDR(serviceFee)}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-dashed border-ink-200 pt-2 text-base font-extrabold text-ink-900">
                    <dt>Total</dt>
                    <dd className="font-mono">{formatIDR(total)}</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  onClick={onCheckout}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-700 active:scale-[0.98]"
                >
                  <Zap size={17} />
                  Simulate Checkout
                </button>
                <p className="mt-2 text-center text-[11px] text-ink-400">
                  Demo only — no real payment is processed.
                </p>
              </footer>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
