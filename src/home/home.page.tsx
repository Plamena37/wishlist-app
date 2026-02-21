import HeroSection from './components/hero-section'
import PainPointSection from './components/pain-point-section'
import StepsSection from './components/steps-section'
import OverviewSection from './components/overview-section'

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <PainPointSection />
      <StepsSection />
      <OverviewSection />
    </div>
  )
}

export default HomePage
