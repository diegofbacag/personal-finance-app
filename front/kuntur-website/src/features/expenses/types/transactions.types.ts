export const CATEGORIES = {
  INCOME: {
    code: 'INCOME',
    label: 'Ingresos',
    subcategories: {
      SALARY: { code: 'SALARY', label: 'Salario' },
      FREELANCE: { code: 'FREELANCE', label: 'Freelance' },
      BUSINESS: { code: 'BUSINESS', label: 'Negocio' },
      BONUSES: { code: 'BONUSES', label: 'Bonos' },
      OTHERS: { code: 'OTHERS', label: 'Otros' },
    },
  },
  FIXED_EXPENSES: {
    code: 'FIXED_EXPENSES',
    label: 'Gastos Fijos',
    subcategories: {
      RENT: { code: 'RENT', label: 'Alquiler / Hipoteca' },
      UTILITIES: { code: 'UTILITIES', label: 'Servicios' },
      INSURANCE: { code: 'INSURANCE', label: 'Seguros' },
      TRANSPORT: { code: 'TRANSPORT', label: 'Pago de Auto / Transporte' },
      DEBTS: { code: 'DEBTS', label: 'Pago de Deudas' },
      GROCERIES: { code: 'GROCERIES', label: 'Supermercado' },
      CLOTHING: { code: 'CLOTHING', label: 'Ropa' },
      PHONE: { code: 'PHONE', label: 'Teléfono' },
      SUBSCRIPTIONS: { code: 'SUBSCRIPTIONS', label: 'Suscripciones' },
      MISC: { code: 'MISC', label: 'Misceláneos' },
      OTHERS: { code: 'OTHERS', label: 'Otros' },
    },
  },
  GUILT_FREE_EXPENSES: {
    code: 'GUILT_FREE_EXPENSES',
    label: 'Gastos Sin Culpa',
    subcategories: {
      RESTAURANTS: { code: 'RESTAURANTS', label: 'Restaurantes' },
      ENTERTAINMENT: { code: 'ENTERTAINMENT', label: 'Entretenimiento' },
      HOBBIES: { code: 'HOBBIES', label: 'Hobbies' },
      TRAVEL: { code: 'TRAVEL', label: 'Viajes' },
      OTHERS: { code: 'OTHERS', label: 'Otros' },
    },
  },
  SAVINGS: {
    code: 'SAVINGS',
    label: 'Ahorros',
    subcategories: {
      VACATIONS: { code: 'VACATIONS', label: 'Vacaciones' },
      GIFTS: { code: 'GIFTS', label: 'Regalos' },
      EMERGENCY_FUND: { code: 'EMERGENCY_FUND', label: 'Fondo de Emergencia' },
      BIG_PURCHASE: { code: 'BIG_PURCHASE', label: 'Compra Grande' },
      OTHERS: { code: 'OTHERS', label: 'Otros' },
    },
  },
  INVESTMENTS: {
    code: 'INVESTMENTS',
    label: 'Inversiones',
    subcategories: {
      POST_TAX_RETIREMENT: {
        code: 'POST_TAX_RETIREMENT',
        label: 'Retiro Post-Impuestos',
      },
      STOCKS: { code: 'STOCKS', label: 'Acciones' },
      INDEX_FUNDS: { code: 'INDEX_FUNDS', label: 'Fondos Indexados' },
      CRYPTO: { code: 'CRYPTO', label: 'Criptomonedas' },
      OTHERS: { code: 'OTHERS', label: 'Otros' },
    },
  },
} as const

export type Categories = typeof CATEGORIES
export type CategoryCode = keyof Categories

export type SubcategoryCode<C extends CategoryCode> =
  keyof Categories[C]['subcategories']

export function getSubcategories<C extends CategoryCode>(category: C) {
  return CATEGORIES[category].subcategories
}

export function getCategoryLabel(category: CategoryCode) {
  return CATEGORIES[category].label
}

export function getSubcategoryLabel<C extends CategoryCode>(
  category: C,
  subcategory: SubcategoryCode<C>,
) {
  return CATEGORIES[category].subcategories[subcategory].label
}
