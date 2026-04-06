import { CheckCircleIcon, TrendUpIcon } from '@phosphor-icons/react'

interface RevisionCardProps {
  id: string
  title: string
  description: string
  is_completed: boolean
  handleCompletedAction: (id: string) => void
}

const defaultStyles = 'bg-white dark:bg-slate-900 dark:border-slate-800'
const completedActionStyles = 'opacity-60 bg-slate-50/50 dark:bg-slate-800/30'

export const RevisionCard = ({
  id,
  title,
  description,
  is_completed,
  handleCompletedAction,
}: RevisionCardProps) => {
  return (
    <div
      className={`p-5 rounded-2xl border border-slate-100  flex flex-col justify-between transition-all duration-300 gap-4 ${is_completed ? completedActionStyles : defaultStyles}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <TrendUpIcon className="text-2xl" />
        </div>
        {is_completed ? (
          <p className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-tight">
            Completado
          </p>
        ) : (
          <p className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-tight">
            Prioridad Alta
          </p>
        )}
      </div>
      <div className="space-y-1 mb-2">
        <h4 className="text-base font-bold text-slate-900 dark:text-white">
          {title}
        </h4>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      {/* <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
          <span>Progreso</span>
          <span>0%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="bg-primary h-full w-[0%]"></div>
        </div>
        <p className="text-[10px] text-slate-400 font-medium">
          Faltan S/ 1,000 para alcanzar S/ 1,000
        </p>
      </div> */}
      {is_completed ? (
        <button
          className="w-full py-2.5 bg-primary dark:bg-emerald-900/30 text-white dark:text-emerald-400 text-sm font-bold rounded-xl flex items-center justify-center gap-1"
          disabled={true}
        >
          Completado
        </button>
      ) : (
        <button
          className="w-full py-2.5 bg-primary text-white text-sm font-bold rounded-2xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all cursor-pointer"
          onClick={() => handleCompletedAction(id)}
        >
          Completar
        </button>
      )}
    </div>
  )
}
