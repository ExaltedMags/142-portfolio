import { Header } from '@/components/Header'
import { AchievementList } from '@/components/AchievementList'
import { Narrative } from '@/components/Narrative'
import { Footer } from '@/components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <main>
        <AchievementList />
        <Narrative />
      </main>

      <Footer />
    </div>
  )
}

export default App
