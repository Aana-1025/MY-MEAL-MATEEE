import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import LoadingSpinner from './components/ui/LoadingSpinner'

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'))
const Favorites = lazy(() => import('./pages/Favorites'))
const Planner = lazy(() => import('./pages/Planner'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <div className="min-h-screen bg-dark-700">
      <Navbar />
      <main className="pt-16 pb-20">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default App