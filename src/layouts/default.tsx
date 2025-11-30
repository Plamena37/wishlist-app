import { Outlet } from 'react-router'
import { RouterHistoryProvider } from '@/router/context/router-history.context'
import { authMessages, loadingMessages } from '@/lib/constants/messages'
import { useAuth } from '@/auth/hooks/useAuth'
import useBreakpoints from '@/lib/hooks/useBreakpoints'
import { AppHeader } from '@/components/app-header/app-header'
import { Text } from '@/components/ui/text'
import { LoadingOverlay } from '@/components/overlay/loading-overlay'

export default function DefaultLayout() {
  const { loading } = useAuth()
  const { isSm } = useBreakpoints()

  return (
    <RouterHistoryProvider>
      <div
        className="grid h-full grid-cols-[1fr] grid-rows-[56px_auto_32px]
                 [grid-template-areas:'header''main''footer'] bg-gray-20 overflow-y-auto"
      >
        {/* <div className="min-h-auto flex flex-col bg-gray-200"> */}
        <AppHeader />
        <main className="[grid-area:main] flex flex-1 flex-col bg-gray-200">
          {/* <main className="flex-1 min-h-0 flex flex-col items-center justify-center overflow-y-auto"> */}
          <Outlet />
        </main>
        <footer className="w-full px-8 py-2 bg-gray-200 h-8">
          {isSm ? (
            <Text
              as="p"
              variant="body-sm"
              className="text-gray-600"
            >
              Copyright &copy; {new Date().getFullYear()} Whishlist. All Rights
              Reserved
            </Text>
          ) : (
            <Text
              as="p"
              variant="body-sm"
              className="text-gray-600 text-center"
            >
              Copyright &copy; {new Date().getFullYear()} Whishlist.
            </Text>
          )}
        </footer>
        {loading && (
          <LoadingOverlay
            title={authMessages.logging_in}
            subtitle={loadingMessages.loading_subtitle}
          />
        )}
      </div>
    </RouterHistoryProvider>
  )
}
