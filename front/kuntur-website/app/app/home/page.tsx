'use client'

import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { CheckCircleIcon, TrendUpIcon } from '@phosphor-icons/react'
import { Button } from '@/src/components/ui/Button'

export default function HomePage() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('task_instances')
        .select('*, tasks!inner(title)')

      if (error) {
        console.error(error)
        return
      }
      console.log('data', data)
      setTasks(data)
    }

    fetchTasks()
  }, [tasks])

  const handleCompletedTask = async (taskId) => {
    const { data, error } = await supabase
      .from('task_instances')
      .update({ completed_at: new Date().toISOString() })
      .eq('id', taskId)
      .select()

    console.log(data)
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
            <h3 className="text-lg font-bold text-slate-900">Este mes</h3>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Acciones recomendadas para optimizar tus finanzas
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 gap-4">
              <div className="flex items-start justify-between mb-2">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <TrendUpIcon className="text-2xl" />
                </div>
              </div>
              <div className="space-y-1 mb-2">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Invertir 10% de mis ingresos
                </h4>
                <p className="text-xs text-slate-500">
                  Aumenta tu patrimonio a largo plazo.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                  <span>Progreso</span>
                  <span>0%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[0%]"></div>
                </div>
              </div>
              <button className="w-full py-2.5 bg-primary text-white text-sm font-bold rounded-2xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all cursor-pointer">
                Completar
              </button>
            </div>
            {/* Card */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 gap-4">
              <div className="flex items-start justify-between mb-2">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <TrendUpIcon className="text-2xl" />
                </div>
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Invertir 10% de mis ingresos
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Aumenta tu patrimonio a largo plazo.
                </p>
              </div>
              <button className="w-full py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all cursor-pointer">
                Completar
              </button>
            </div>
            {/* Card */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 gap-4">
              <div className="flex items-start justify-between mb-2">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <TrendUpIcon className="text-2xl" />
                </div>
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Invertir 10% de mis ingresos
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Aumenta tu patrimonio a largo plazo.
                </p>
              </div>
              <button className="w-full py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all cursor-pointer">
                Completar
              </button>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Este mes
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Assignments and goals for this month
            </p>
          </div>
          <button className="flex items-center gap-2 text-primary hover:bg-primary/5 px-3 py-2 rounded-lg transition-colors">
            {/* <PlusSquare size={20} weight="bold" /> */}
            <span className="text-sm font-bold">Add To-Do</span>
          </button>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left — Recommended Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              {/* <Sparkle size={14} weight="fill" className="text-amber-500" /> */}
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Recommended Actions
              </h4>
            </div>

            <div className="space-y-3">
              {/* Invest */}
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center gap-4 p-4 rounded-xl border border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
                >
                  <div className="size-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 shrink-0">
                    <TrendUpIcon size={20} weight="bold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {t.tasks.title}
                    </p>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase mt-0.5">
                      High Priority
                    </p>
                  </div>
                  {t.completed_at === null ? (
                    <button
                      className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-lg shadow-sm hover:opacity-90 transition-opacity shrink-0 cursor-pointer"
                      onClick={() => handleCompletedTask(t.id)}
                    >
                      Completar
                    </button>
                  ) : (
                    <div className="flex text-emeral-600">Completado</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right — My To-Dos */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              {/* <ListBullets size={14} weight="bold" className="text-primary" /> */}
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                My To-Dos
              </h4>
            </div>

            <div className="space-y-3">
              {/* Unchecked task */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group">
                {/* <Square
                  size={22}
                  weight="regular"
                  className="text-slate-300 dark:text-slate-600 cursor-pointer hover:text-primary transition-colors shrink-0"
                /> */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Call bank about credit card annual fee
                  </p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold uppercase tracking-tighter shrink-0">
                  Calls
                </span>
              </div>

              {/* Checked / completed task */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group">
                {/* <CheckSquare
                  size={22}
                  weight="fill"
                  className="text-primary cursor-pointer shrink-0"
                /> */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-400 dark:text-slate-500 line-through">
                    Pay electricity bill
                  </p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold uppercase tracking-tighter shrink-0">
                  Home
                </span>
              </div>

              {/* Add new task */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 transition-all group">
                <input
                  className="bg-transparent border-none focus:ring-0 text-sm font-medium w-full p-0 placeholder:text-slate-400 outline-none"
                  placeholder="Type to add a new task..."
                  type="text"
                />
                {/* <ArrowElbowDownLeft
                  size={18}
                  className="text-slate-300 group-focus-within:text-primary transition-colors shrink-0"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
