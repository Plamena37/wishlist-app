import { Outlet } from 'react-router'
import { RouterHistoryProvider } from '@/router/context/router-history.context'
import { AppHeader } from '@/components/app-header/app-header'

export default function DefaultLayout() {
  return (
    <RouterHistoryProvider>
      <div
        // className="grid h-screen grid-cols-[56px_1fr] grid-rows-[56px_auto_32px]
        //          [grid-template-areas:'header_header''sidebar_main''sidebar_footer']"
        className="bg-amber-50"
      >
        <AppHeader />
        <Outlet />
        {/* {loading && (
          <LoadingOverlay
            title={authMessages.logging_in}
            subtitle={loadingMessages.loading_subtitle}
          />
        )}
        {error && !loading && <GeneralError />} */}
      </div>
    </RouterHistoryProvider>
  )
}
