// import Loading from '@/assets/loading-blue.svg'
// import { Icon } from '@/components/ui/icon'
// import { Text } from '@/components/ui/text'

// interface LoadingOverlayProps {
//   title: string
//   subtitle: string
// }

// export const LoadingOverlay = ({ title, subtitle }: LoadingOverlayProps) => {
//   return (
//     <div
//       className="absolute inset-0 bg-blue-100/90 backdrop-blur-lg w-full h-full flex flex-col gap-4 justify-center items-center z-50"
//       data-testid="loading-overlay-container"
//     >
//       <Icon
//         src={Loading}
//         size={'lg'}
//         className="animate-spin-reverse"
//       />

//       <Text
//         as="h3"
//         variant="h3"
//         weight="semibold"
//         className="text-blue-900"
//         data-testid="loading-overlay-title"
//       >
//         {title}
//       </Text>
//       <Text
//         as="h5"
//         variant="h5"
//         className="text-gray-600"
//         data-testid="loading-overlay-subtitle"
//       >
//         {subtitle}
//       </Text>
//     </div>
//   )
// }
