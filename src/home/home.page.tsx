import { Link } from 'react-router'
import { ROUTES } from '@/router/constants/app-routes'

const HomePage = () => {
  return (
    <div>
      <h2>Home</h2>

      <Link to={ROUTES.CARDS}>Go to Cards</Link>
    </div>
  )
}

export default HomePage
