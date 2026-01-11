import {
  DirectionAwareTabs,
  DirectionAwareTabsList,
  DirectionAwareTabsTrigger,
  DirectionAwareTabsContent,
} from '@/components/ui/direction-aware-tabs'
import { AchievementList } from './AchievementList'
import { achievements } from '@/content/achievements'

export function AchievementsWithTabs() {
  // Filter achievements: serious vs not-so-serious
  const notSeriousIds = ['pc-builder', 'vainglory', 'musician', 'coffee']
  const seriousAchievements = achievements.filter(
    (item) => !notSeriousIds.includes(item.id)
  )
  const notSeriousAchievements = achievements.filter(
    (item) => notSeriousIds.includes(item.id)
  )

  return (
    <DirectionAwareTabs defaultValue="serious" className="w-full">
      {/* Tabs positioned between Header and AchievementList */}
      <div className="container-editorial">
        <div className="max-w-2xl mx-auto flex justify-center pt-4 pb-6 md:pt-6 md:pb-8">
          <DirectionAwareTabsList>
            <DirectionAwareTabsTrigger value="serious">
              Serious stuff
            </DirectionAwareTabsTrigger>
            <DirectionAwareTabsTrigger value="not-serious">
              Not-so-serious stuff
            </DirectionAwareTabsTrigger>
          </DirectionAwareTabsList>
        </div>
      </div>

      {/* Tab content */}
      <DirectionAwareTabsContent value="serious" className="mt-0">
        <AchievementList achievementsToShow={seriousAchievements} />
      </DirectionAwareTabsContent>

      <DirectionAwareTabsContent value="not-serious" className="mt-0">
        <AchievementList achievementsToShow={notSeriousAchievements} />
      </DirectionAwareTabsContent>
    </DirectionAwareTabs>
  )
}
