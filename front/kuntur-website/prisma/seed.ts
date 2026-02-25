import { prisma } from '../lib/prisma'

const CATEGORIES = {
  FIXED_EXPENSES: 'Gastos Fijos',
  GUILT_FREE_EXPENSES: 'Gastos Sin Culpa',
  INCOME: 'Ingresos',
  INVESTMENTS: 'Inversiones',
  SAVINGS: 'Ahorros',
} as const

const SUBCATEGORIES: Record<
  keyof typeof CATEGORIES,
  { name: string; code: string }[]
> = {
  FIXED_EXPENSES: [
    { name: 'Alquiler / Hipoteca', code: 'RENT' },
    { name: 'Servicios', code: 'UTILITIES' },
    { name: 'Seguros', code: 'INSURANCE' },
    { name: 'Pago de Auto / Transporte', code: 'TRANSPORT' },
    { name: 'Pago de Deudas', code: 'DEBTS' },
    { name: 'Supermercado', code: 'GROCERIES' },
    { name: 'Ropa', code: 'CLOTHING' },
    { name: 'Teléfono', code: 'PHONE' },
    { name: 'Suscripciones', code: 'SUBSCRIPTIONS' },
    { name: 'Misceláneos', code: 'MISC' },
    { name: 'Otros', code: 'OTHERS' },
  ],

  GUILT_FREE_EXPENSES: [
    { name: 'Restaurantes', code: 'RESTAURANTS' },
    { name: 'Entretenimiento', code: 'ENTERTAINMENT' },
    { name: 'Hobbies', code: 'HOBBIES' },
    { name: 'Viajes', code: 'TRAVEL' },
    { name: 'Otros', code: 'OTHERS' },
  ],

  INCOME: [
    { name: 'Salario', code: 'SALARY' },
    { name: 'Freelance', code: 'FREELANCE' },
    { name: 'Negocio', code: 'BUSINESS' },
    { name: 'Bonos', code: 'BONUSES' },
    { name: 'Otros', code: 'OTHERS' },
  ],

  INVESTMENTS: [
    { name: 'Retiro Post-Impuestos', code: 'POST_TAX_RETIREMENT' },
    { name: 'Acciones', code: 'STOCKS' },
    { name: 'Fondos Indexados', code: 'INDEX_FUNDS' },
    { name: 'Criptomonedas', code: 'CRYPTO' },
    { name: 'Otros', code: 'OTHERS' },
  ],

  SAVINGS: [
    { name: 'Vacaciones', code: 'VACATIONS' },
    { name: 'Regalos', code: 'GIFTS' },
    { name: 'Fondo de Emergencia', code: 'EMERGENCY_FUND' },
    { name: 'Compra Grande', code: 'BIG_PURCHASE' },
    { name: 'Otros', code: 'OTHERS' },
  ],
}

async function main() {
  for (const [code, name] of Object.entries(CATEGORIES)) {
    const category = await prisma.category.upsert({
      where: { code },
      update: { name },
      create: { code, name },
    })

    for (const sub of SUBCATEGORIES[code as keyof typeof CATEGORIES]) {
      await prisma.subcategory.upsert({
        where: {
          name_categoryId: {
            name: sub.name,
            categoryId: category.id,
          },
        },
        update: { code: sub.code },
        create: {
          name: sub.name,
          code: sub.code,
          categoryId: category.id,
        },
      })
    }
  }

  console.log('Categories & Subcategories seeded')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
