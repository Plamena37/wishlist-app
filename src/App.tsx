import { useCards } from './lib/hooks/useCards'

const App = () => {
  const { cards, loading, error } = useCards()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <ul>
      {cards.map((card) => (
        <li key={card.id}>{card.title}</li>
      ))}
    </ul>
  )
}

export default App
