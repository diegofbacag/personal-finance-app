import { Input } from '@/src/components/form/Input'

interface CashFlowScenario {
  direction: 'inflow' | 'outflow'
  category: string
  subcategory: string
}

export default function CashFlowScenariosPage() {
  return (
    <main>
      <section>
        <div>
          <div>
            <p>Inflows</p>
          </div>
          <div>
            <p>Income</p>
            <Input />
            <p>Freelance</p>
            <Input />
            <p>Business</p>
            <Input />
          </div>
        </div>
        <div>Outflows</div>
        <div>
          <div>
            <p>Gastos fijos</p>
            <p>Gastos fijos</p>
            <Input />
          </div>
        </div>
        <div>
          <button>Enviar</button>
        </div>
      </section>
    </main>
  )
}
