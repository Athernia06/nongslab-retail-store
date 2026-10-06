import { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Catalog from './components/Catalog.jsx'
import StoreLocator from './components/StoreLocator.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [storeId, setStoreId] = useState('st01')

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex min-h-svh flex-col">
      <Header storeId={storeId} onStoreChange={setStoreId} />
      <main className="flex-1">
        <Hero onExplore={scrollToMenu} />
        <Catalog />
        <StoreLocator />
      </main>
      <Footer />
    </div>
  )
}

export default App
