// import { StrictMode } from 'react'
import { RouterProvider } from 'react-router'
import { createRoot } from 'react-dom/client'
import { SnackbarProvider } from 'notistack'
import router from '@/router/index'
import { AuthProvider } from '@/auth/context/auth.context'
import { CardsProvider } from '@/cards/context/cards-context'
// import { CardProvider } from '@/card/context/card-context'
// import { CardsListProvider } from '@/cards/context/cards-list-context'
import './index.css'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <AuthProvider>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <CardsProvider>
        {/* <CardsListProvider>
          <CardProvider> */}
        <RouterProvider router={router} />
        {/* </CardProvider> */}
        {/* </CardsListProvider> */}
      </CardsProvider>
    </SnackbarProvider>
  </AuthProvider>
  // </StrictMode>
)
