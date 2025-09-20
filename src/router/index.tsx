import {
  // createBrowserRouter,
  Navigate,
  RouteObject,
  createHashRouter,
} from 'react-router'
import { ROUTES } from '@/router/constants/app-routes'
import DefaultLayout from '@/layouts/default'
import CardPage from '@/card/card.page'
import CardsPage from '@/cards/cards.page'
import MyCardsPage from '@/cards/my-cards.page'
import GeneralErrorPage from '@/components/general-error/general-error.page'

// export const routes: RouteObject[] = [
//   {
//     element: <DefaultLayout />,
//     children: [
//       {
//         path: ROUTES.HOME,
//         index: true,
//         element: <Navigate to={ROUTES.CARDS} />,
//       },
//       {
//         path: ROUTES.CARDS,
//         index: true,
//         element: <CardsPage />,
//         // errorElement: <GeneralError />,
//       },
//       {
//         path: ROUTES.CARD,
//         index: true,
//         element: <CardPage />,
//         // errorElement: <GeneralError />,
//       },
//       {
//         path: ROUTES.MY_CARDS,
//         index: true,
//         element: <MyCardsPage />,
//         // errorElement: <GeneralError />,
//       },
//       {
//         path: ROUTES.MY_CARD,
//         index: true,
//         element: <CardPage />,
//         // errorElement: <GeneralError />,
//       },
//       {
//         path: '*',
//         element: <div>Not Found</div>,
//       },
//     ],
//   },
//   {
//     path: '*',
//     element: <div>Not Found</div>,
//   },
// ]

// export default createBrowserRouter(routes)

export const routes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        path: ROUTES.HOME,
        index: true,
        element: <Navigate to={ROUTES.CARDS} />,
      },
      { path: ROUTES.CARDS, element: <CardsPage /> },
      { path: ROUTES.CARD, element: <CardPage /> },
      { path: ROUTES.MY_CARDS, element: <MyCardsPage /> },
      { path: ROUTES.MY_CARD, element: <CardPage /> },
      { path: '*', element: <GeneralErrorPage /> },
    ],
  },
  { path: '*', element: <GeneralErrorPage /> },
]

export default createHashRouter(routes)
