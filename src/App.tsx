import { Header } from '@/components/Header'
import { AchievementsWithTabs } from '@/components/AchievementsWithTabs'
import { Narrative } from '@/components/Narrative'
import { Footer } from '@/components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <main>
        <AchievementsWithTabs />
        <Narrative />
      </main>

      <Footer />
    </div>
  )
}

export default App
