import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { seedDemoData } from './data/demo.ts'

// Seed demo data for development (remove in production)
if (import.meta.env.DEV) {
  seedDemoData()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
