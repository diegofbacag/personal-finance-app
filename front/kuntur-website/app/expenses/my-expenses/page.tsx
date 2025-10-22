export default function MyExpensesPage() {
  return (
    <main className="p-4 font-poppins">
      <header>
        <h1 className="text-3xl font-bold">Mis gastos</h1>
      </header>
      <section aria-label="Expenses list">Texto</section>
      <section
        aria-label="Add expenses"
        className="fixed bottom-10 min-w-[80vw] left-1/2 transform -translate-x-1/2 "
      >
        <div
          className="grid grid-cols-[auto_1fr_auto] items-center border rounded-full border-gray-900/5
 p-2 shadow-md"
        >
          <div>+</div>
          <div className="grid grid-cols-4">
            <div>Monto S./</div>
            <div>Category</div>
            <div>Description</div>
            <div>Date</div>
          </div>

          <button className="flex items-center justify-center bg-black rounded-full text-white h-10 w-10">
            i
          </button>
        </div>
      </section>
    </main>
  )
}
