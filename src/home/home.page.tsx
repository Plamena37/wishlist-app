import { useCards } from '@/lib/hooks/useCards'
import { Link } from 'react-router'

export default function HomePage() {
  const { cards, loading, error } = useCards()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <ul>
      {cards.map((card) => (
        <li key={card.id}>
          <p>Title: {card.title}</p>
          {card.description && <p>Description: {card.description}</p>}
          <p>Card is: {card.isPublic ? 'Public' : 'Private'}</p>
          <p>Card Owner: {card.ownerId}</p>
          <p>Items:</p>
          <ul>
            {card.items.map((item) => (
              <li key={item.id}>
                <p>{item.name}</p>
                <p>Price: {item.price}$</p>
                {item.link && (
                  <Link
                    to={item.link}
                    target="_blank"
                  >
                    {item.link}
                  </Link>
                )}
                <p>Free: {item.reservedBy ? 'No' : 'Yes'}</p>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}
