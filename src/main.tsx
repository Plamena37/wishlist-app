// import { StrictMode } from 'react'
import { RouterProvider } from 'react-router'
import { createRoot } from 'react-dom/client'
import router from '@/router/index'
import { AuthProvider } from '@/auth/context/auth.context'
import { CardsProvider } from '@/cards/context/cards-context'
import './index.css'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <AuthProvider>
    <CardsProvider>
      <RouterProvider router={router} />
    </CardsProvider>
  </AuthProvider>
  // </StrictMode>
)
