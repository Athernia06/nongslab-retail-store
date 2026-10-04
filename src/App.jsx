import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Catalog from './components/Catalog.jsx'
import StoreLocator from './components/StoreLocator.jsx'
import CartModal from './components/CartModal.jsx'
import Footer from './components/Footer.jsx'
import { products } from './data/products.js'
import { CheckCircle2 } from 'lucide-react'

function App() {
  const [storeId, setStoreId] = useState('st01')
  const [cartMap, setCartMap] = useState({})
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutState, setCheckoutState] = useState('idle')
  const [pickupCode, setPickupCode] = useState(null)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  const showToast = useCallback((message) => {
    setToast({ id: Date.now(), message })
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 2200)
  }, [])

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  const addToCart = useCallback(
    (product) => {
      setCartMap((current) => ({
        ...current,
        [product.id]: (current[product.id] ?? 0) + 1,
      }))
      showToast(`${product.name} added to order`)
    },
    [showToast],
  )

  const updateQty = useCallback((productId, delta) => {
    setCartMap((current) => {
      const next = { ...current }
      const qty = (next[productId] ?? 0) + delta
      if (qty <= 0) delete next[productId]
      else next[productId] = qty
      return next
    })
  }, [])

  const removeItem = useCallback((productId) => {
    setCartMap((current) => {
      const next = { ...current }
      delete next[productId]
      return next
    })
  }, [])

  const cartItems = useMemo(
    () =>
      Object.entries(cartMap)
        .map(([id, qty]) => {
          const product = products.find((entry) => entry.id === id)
          return product ? { ...product, qty } : null
        })
        .filter(Boolean),
    [cartMap],
  )

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.qty, 0),
    [cartItems],
  )

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems],
  )

  const scrollToMenu = useCallback(() => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleCheckout = useCallback(() => {
    setPickupCode(Math.floor(Math.random() * 9000) + 1000)
    setCheckoutState('success')
    setCartMap({})
  }, [])

  const openCart = useCallback(() => {
    setCheckoutState('idle')
    setCartOpen(true)
  }, [])

  const closeCart = useCallback(() => {
    setCartOpen(false)
    setCheckoutState('idle')
  }, [])

  return (
    <div className="flex min-h-svh flex-col">
      <Header
        storeId={storeId}
        onStoreChange={setStoreId}
        cartCount={cartCount}
        onOpenCart={openCart}
      />
      <main className="flex-1">
        <Hero onExplore={scrollToMenu} />
        <Catalog onAdd={addToCart} />
        <StoreLocator />
      </main>
      <Footer />

      <CartModal
        open={cartOpen}
        cartItems={cartItems}
        subtotal={subtotal}
        storeId={storeId}
        onClose={closeCart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onStoreChange={setStoreId}
        onCheckout={handleCheckout}
        checkoutState={checkoutState}
        pickupCode={pickupCode}
      />

      {toast && (
        <div
          key={toast.id}
          role="status"
          className="animate-toast-in fixed inset-x-4 bottom-5 z-[55] flex justify-center sm:right-6 sm:left-auto"
        >
          <p className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white shadow-xl">
            <CheckCircle2 size={16} className="text-brand-400" />
            {toast.message}
          </p>
        </div>
      )}
    </div>
  )
}

export default App
