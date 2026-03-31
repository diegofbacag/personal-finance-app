export default function HomePage() {
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
      </div>
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Financial Action Center
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
              <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                <div className="size-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 shrink-0">
                  {/* <TrendingUp size={20} weight="bold" /> */}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Invest 10% of my income
                  </p>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase mt-0.5">
                    High Priority
                  </p>
                </div>
                <button className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-lg shadow-sm hover:opacity-90 transition-opacity shrink-0">
                  Invest Now
                </button>
              </div>

              {/* Emergency Fund */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                <div className="size-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 shrink-0">
                  {/* <PiggyBank size={20} weight="bold" /> */}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Save for emergency fund
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-1 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full w-[90%]" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 shrink-0">
                      10% remaining
                    </p>
                  </div>
                </div>
                <button className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shrink-0">
                  Deposit
                </button>
              </div>

              {/* Check Expenses */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                <div className="size-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 shrink-0">
                  {/* <Eye size={20} weight="bold" /> */}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Check last month expenses
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">
                    Pending Review
                  </p>
                </div>
                <button className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shrink-0">
                  View Report
                </button>
              </div>
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
