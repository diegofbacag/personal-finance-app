import { ReactNode } from 'react'

type Progress = {
  value: number
  label: string
}

type StatCardProps = {
  icon: ReactNode
  iconBg?: string
  iconColor?: string
  badge?: string
  badgeStyle?: string
  label: string
  value: string | number
  progress?: Progress
  footnote?: string
}

export const StatCard = ({
  icon,
  iconBg = 'bg-blue-100',
  iconColor = 'text-blue-600',
  badge,
  badgeStyle = 'text-emerald-500 bg-emerald-50',
  label,
  value,
  progress,
  footnote,
}: StatCardProps) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xs border-0.5 border-slate-100 dark:border-slate-700">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 ${iconBg} rounded-xl ${iconColor}`}>{icon}</div>

        {badge && (
          <span className={`text-xs font-bold px-2 py-1 rounded ${badgeStyle}`}>
            {badge}
          </span>
        )}
      </div>

      <p className="text-sm font-medium text-slate-500">{label}</p>

      <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">
        {value}
      </h3>

      {progress && (
        <div className="mt-4 flex items-center gap-2">
          <div className="h-1.5 flex-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="bg-amber-100 h-full rounded-full"
              style={{ width: `${progress.value}%` }}
            />
          </div>

          <span className="text-[10px] font-bold text-slate-400">
            {progress.label}
          </span>
        </div>
      )}

      {footnote && (
        <p className="mt-4 text-xs text-slate-400 font-medium">{footnote}</p>
      )}
    </div>
  )
}
