import { useEffect } from 'react'
import { useTranslation } from '@/lib/hooks/useTranslation'
import { useCardsContext } from '@/cards/hooks/useCards'
import { CardsList } from '@/cards/cards-list'
import { LoadingOverlay } from '@/components/overlay/loading-overlay'
import { NotFoundCards } from '@/cards/not-found-cards'
import { AddCardDialog } from '@/cards/add-card-dialog'
import { SignInOverlay } from '@/components/overlay/sign-in-overlay'

const CardsPage = () => {
  const { t } = useTranslation()
  const { getAllPublicCards, publicCards, loading, showSignInDialog } =
    useCardsContext()

  useEffect(() => {
    getAllPublicCards()
  }, [])

  if (loading) {
    return (
      <LoadingOverlay
        title={t('loading.loadingCardsTitle')}
        subtitle={t('loading.loadingCardsSubtitle')}
      />
    )
  }

  return (
    <>
      <AddCardDialog />

      {publicCards.length === 0 ? (
        <NotFoundCards />
      ) : (
        <CardsList cards={publicCards} />
      )}

      {showSignInDialog && <SignInOverlay />}
    </>
  )
}

export default CardsPage
