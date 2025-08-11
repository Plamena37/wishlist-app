// import { useNavigate } from 'react-router'
// import CircleExclamation from '@/assets/circle-exclamation.svg'
// import { ROUTES } from '@/router/constants/app-routes'
// import { Icon } from '@/components/ui/icon'
// import { Text } from '@/components/ui/text'
// import { Button } from '@/components/ui/button'

// interface ErrorOverlayProps {
//   title: string
//   subtitle: string
//   onRetry: () => void
// }

// export const ErrorOverlay = ({
//   title,
//   subtitle,
//   onRetry,
// }: ErrorOverlayProps) => {
//   const navigate = useNavigate()

//   const handleNavigateToTriagePage = () => {
//     navigate(ROUTES.TRIAGE)
//   }

//   return (
//     <div
//       className="absolute inset-0 bg-blue-100/90 backdrop-blur-lg z-50"
//       data-testid="error-overlay-container"
//     >
//       <div className="max-w-[496px] mx-auto h-full flex flex-col gap-4 justify-center items-center text-center">
//         <Icon
//           src={CircleExclamation}
//           className="h-20 w-20"
//           data-testid="error-overlay-icon"
//         />

//         <Text
//           as="h3"
//           variant="h3"
//           weight="semibold"
//           className="text-blue-900"
//           data-testid="error-overlay-title"
//         >
//           {title}
//         </Text>
//         <Text
//           as="h5"
//           variant="h5"
//           className="text-gray-600"
//           data-testid="error-overlay-subtitle"
//         >
//           {subtitle}
//         </Text>

//         <div className="flex flex-col gap-4 justify-center mt-6 w-50">
//           <Button
//             variant={'primary'}
//             className="rounded-sm w-full font-semibold"
//             size={'sm'}
//             onClick={onRetry}
//             data-testid="error-overlay-retry-button"
//           >
//             Retry
//           </Button>
//           <Button
//             variant={'link'}
//             className="rounded-sm w-full font-semibold"
//             onClick={handleNavigateToTriagePage}
//             data-testid="error-overlay-navigate-to-triage-page-button"
//           >
//             Back to Triage Table
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }
