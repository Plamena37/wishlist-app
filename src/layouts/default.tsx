import { Outlet } from 'react-router'
import { RouterHistoryProvider } from '@/router/context/router-history.context'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { useAuth } from '@/auth/hooks/useAuth'
import { AppHeader } from '@/components/navigation/app-header'
import { LoadingOverlay } from '@/components/overlay/loading-overlay'
import { AIAssistant } from '@/components/ai-assistant/ai-assistant'
import { AppFooter } from '@/components/navigation/app-footer'

export default function DefaultLayout() {
  const { t } = useTranslation()
  const { loading } = useAuth()

  return (
    <RouterHistoryProvider>
      <div
        className="grid h-full grid-cols-[1fr] 
        grid-rows-[56px_auto_120px] sm:grid-rows-[56px_auto_94px]               [grid-template-areas:'header''main''footer'] bg-gray-200 overflow-y-auto"
      >
        {/* <div className="min-h-screen flex flex-col bg-gray-200"> */}
        <AppHeader />
        <main className="[grid-area:main] flex flex-1 flex-col bg-gray-200">
          {/* <main className="flex-1 min-h-0 flex flex-col items-center justify-center overflow-y-auto"> */}
          <Outlet />
          <AIAssistant />
        </main>
        <AppFooter />

        {loading && (
          <LoadingOverlay
            title={t('auth.loggingIn')}
            subtitle={t('loading.loadingRequest')}
          />
        )}
      </div>
    </RouterHistoryProvider>
  )
}
