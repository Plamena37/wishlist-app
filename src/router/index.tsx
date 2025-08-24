import { createBrowserRouter, RouteObject } from 'react-router'
import { ROUTES } from '@/router/constants/app-routes'
import DefaultLayout from '@/layouts/default'
import HomePage from '@/home/home.page'
import CardPage from '@/card/card.page'
import CardsPage from '@/cards/cards.page'

export const routes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        // element: <SidebarFooterLayout />,
        children: [
          {
            path: ROUTES.HOME,
            index: true,
            element: <HomePage />,
            // handle: { title: 'Triage' },
            // errorElement: <GeneralError />,
          },
          {
            path: ROUTES.CARDS,
            index: true,
            element: <CardsPage />,
            // errorElement: <GeneralError />,
          },
          {
            path: ROUTES.CARD,
            index: true,
            element: <CardPage />,
            // errorElement: <GeneralError />,
          },
          {
            path: '*',
            element: <div>Not Found</div>,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <div>Not Found</div>,
  },
]

export default createBrowserRouter(routes)
