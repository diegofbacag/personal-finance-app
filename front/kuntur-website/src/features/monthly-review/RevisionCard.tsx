import { TrendUpIcon } from '@phosphor-icons/react'

interface RevisionCardProps {
  title: string
  description: string
}

export const RevisionCard = ({ title, description }: RevisionCardProps) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 gap-4">
      <div className="flex items-start justify-between mb-2">
        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <TrendUpIcon className="text-2xl" />
        </div>
        <p className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-tight">
          Prioridad Alta
        </p>
      </div>
      <div className="space-y-1 mb-2">
        <h4 className="text-base font-bold text-slate-900 dark:text-white">
          {title}
        </h4>
        <p className="text-xs text-slate-500">{description}</p>
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
  )
}
