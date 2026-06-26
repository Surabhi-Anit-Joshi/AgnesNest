import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PGProvider } from './context/PGContext.jsx'
import { MarketplaceProvider } from './context/MarketplaceContext.jsx'
import { LostFoundProvider } from './context/LostFoundContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PGProvider>
        <MarketplaceProvider>
          <LostFoundProvider>
            <App />
          </LostFoundProvider>
        </MarketplaceProvider>
      </PGProvider>
    </AuthProvider>
  </StrictMode>,
)
