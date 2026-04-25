'use client'

import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { CheckCircleIcon, TrendUpIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/Button'
import { RevisionCard } from '@/src/features/monthly-review/RevisionCard'
import { Timestamp } from 'next/dist/server/lib/cache-handlers/types'
import { fetchMonthlyReviewActions } from '@/src/features/monthly-review/services/monthly-review.service'
import { signOut, useSession } from 'next-auth/react'

interface ReviewActionInstance {
  id: string
  title: string
  description: string
  completed_at: boolean
}

export default function HomePage() {
  const [monthlyReviewActions, setMonthlyReviewActions] = useState<
    ReviewActionInstance[]
  >([])
  const [refresh, setRefresh] = useState(0)
  const { data: session } = useSession()

  useEffect(() => {
    const loadMonthlyReviewActions = async () => {
      console.log(session?.user.id)
      const data = await fetchMonthlyReviewActions(session?.user.id)
      setMonthlyReviewActions(data)
    }

    loadMonthlyReviewActions()
  }, [refresh])

  const handleCompletedAction = async (id: string) => {
    const { data, error } = await supabase
      .from('review_action_instances')
      .update({ completed_at: new Date().toISOString() })
      .eq('id', id)
      .select()

    setRefresh((prev) => prev + 1)
  }

  return (
    <main className="flex flex-col bg-[#f6f6f8] min-h-screen h-full items-center">
      <div className="relative flex flex-col w-[95vw] md:w-[80vw] gap-2 px-4 py-4">
        <header className="align-top items-center justify-between mb-2">
          <p className="text-text-muted uppercase tracking-[0.15em] text-[10px] font-bold mb-1">
            Trackeo del mes
          </p>
          <h1 className="items-center text-2xl font-inter font-bold tracking-tight text-text-main mt-0 align-top leading-none w-full">
            Inicio
          </h1>
        </header>
        {/* Este mes */}
        <section className="flex flex-col gap-6 w-full">
          <div className="flex flex-col justify-start">
            <h3 className="text-lg font-bold text-slate-900">
              Revisión Mensual
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Acciones recomendadas para optimizar tus finanzas
            </p>
          </div>
          {/* Card container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {monthlyReviewActions.map((a) => {
              return (
                <RevisionCard
                  key={a.id}
                  id={a.id}
                  title={a.title}
                  description={a.description}
                  is_completed={a.completed_at}
                  handleCompletedAction={handleCompletedAction}
                />
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}
