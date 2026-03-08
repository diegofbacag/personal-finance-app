export const HighlightStatCard = ({
  icon,
  label,
  value,
  footnote,
  progress,
  bg = 'bg-primary',
  shadow = 'shadow-primary/30',
}) => {
  return (
    <div
      className={`${bg} rounded-2xl p-6 shadow-xl ${shadow} text-white relative overflow-hidden`}
    >
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-white/20 rounded-xl text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="#ffffff"
              viewBox="0 0 256 256"
            >
              <path d="M192,116a12,12,0,1,1-12-12A12,12,0,0,1,192,116ZM152,64H112a8,8,0,0,0,0,16h40a8,8,0,0,0,0-16Zm96,48v32a24,24,0,0,1-24,24h-2.36l-16.21,45.38A16,16,0,0,1,190.36,224H177.64a16,16,0,0,1-15.07-10.62L160.65,208h-57.3l-1.92,5.38A16,16,0,0,1,86.36,224H73.64a16,16,0,0,1-15.07-10.62L46,178.22a87.69,87.69,0,0,1-21.44-48.38A16,16,0,0,0,16,144a8,8,0,0,1-16,0,32,32,0,0,1,24.28-31A88.12,88.12,0,0,1,112,32H216a8,8,0,0,1,0,16H194.61a87.93,87.93,0,0,1,30.17,37c.43,1,.85,2,1.25,3A24,24,0,0,1,248,112Zm-16,0a8,8,0,0,0-8-8h-3.66a8,8,0,0,1-7.64-5.6A71.9,71.9,0,0,0,144,48H112A72,72,0,0,0,58.91,168.64a8,8,0,0,1,1.64,2.71L73.64,208H86.36l3.82-10.69A8,8,0,0,1,97.71,192h68.58a8,8,0,0,1,7.53,5.31L177.64,208h12.72l18.11-50.69A8,8,0,0,1,216,152h8a8,8,0,0,0,8-8Z"></path>
            </svg>
          </div>
        </div>
        <p className="text-sm font-medium text-white/80">{label}</p>
        <h3 className="text-3xl font-bold mt-1">{value}</h3>
        {progress && (
          <div className="mt-4 flex items-center gap-2">
            <div className="h-1.5 flex-1 bg-slate-400 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="bg-white h-full rounded-full"
                style={{ width: `${progress.value}%` }}
              />
            </div>

            <span className="text-[10px] font-bold text-slate-400">
              {progress.label}
            </span>
          </div>
        )}
        {footnote && (
          <p className="mt-4 text-xs text-white/60 font-medium tracking-wide">
            {footnote}
          </p>
        )}
      </div>
      {/* Decorative blobs */}
      <div className="absolute -right-8 -bottom-8 size-32 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute -right-4 -top-4 size-24 bg-white/5 rounded-full blur-xl" />
    </div>
  )
}
