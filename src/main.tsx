import { StrictMode } from 'react'
import { RouterProvider } from 'react-router'
import { createRoot } from 'react-dom/client'
import router from '@/router/index'
import { CardItemsProvider } from '@/home/context/card-items-context'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CardItemsProvider>
      <RouterProvider router={router} />
    </CardItemsProvider>
  </StrictMode>
)
