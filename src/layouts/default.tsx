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
        className="grid h-dvh grid-cols-[1fr] grid-rows-[56px_auto_32px]
                 [grid-template-areas:'header''main''footer']"
      >
        <AppHeader />
        <main className="[grid-area:main] flex flex-1 flex-col bg-gray-200 scrollbar-outlined-inverse overflow-y-auto min-h-0">
          <Outlet />
        </main>
        <footer className="w-full px-8 py-2 [grid-area:footer] bg-gray-200">
          {isSm ? (
            <Text
              as="p"
              variant="body-sm"
              className="text-gray-600"
            >
              Copyright &copy; {new Date().getFullYear()} Whishlist App. All
              Rights Reserved
            </Text>
          ) : (
            <Text
              as="p"
              variant="body-sm"
              className="text-gray-600 text-center"
            >
              Copyright &copy; {new Date().getFullYear()} Whishlist App.
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
