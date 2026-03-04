export const CATEGORIES = [
  {
    id: 'INCOME' as const,
    label: 'Ingresos',
    subcategories: [
      { id: 'SALARY' as const, label: 'Salario' },
      { id: 'FREELANCE' as const, label: 'Freelance' },
      { id: 'BUSINESS' as const, label: 'Negocio' },
      { id: 'BONUSES' as const, label: 'Bonos' },
      { id: 'OTHERS' as const, label: 'Otros' },
    ],
  },
  {
    id: 'FIXED_EXPENSES' as const,
    label: 'Gastos Fijos',
    subcategories: [
      { id: 'RENT' as const, label: 'Alquiler / Hipoteca' },
      { id: 'UTILITIES' as const, label: 'Servicios' },
      { id: 'INSURANCE' as const, label: 'Seguros' },
      { id: 'TRANSPORT' as const, label: 'Pago de Auto / Transporte' },
      { id: 'DEBTS' as const, label: 'Pago de Deudas' },
      { id: 'GROCERIES' as const, label: 'Supermercado' },
      { id: 'CLOTHING' as const, label: 'Ropa' },
      { id: 'PHONE' as const, label: 'Teléfono' },
      { id: 'SUBSCRIPTIONS' as const, label: 'Suscripciones' },
      { id: 'MISC' as const, label: 'Misceláneos' },
      { id: 'OTHERS' as const, label: 'Otros' },
    ],
  },
  {
    id: 'VARIABLE_EXPENSES' as const,
    label: 'Gastos Sin Culpa',
    subcategories: [
      { id: 'RESTAURANTS' as const, label: 'Restaurantes' },
      { id: 'ENTERTAINMENT' as const, label: 'Entretenimiento' },
      { id: 'HOBBIES' as const, label: 'Hobbies' },
      { id: 'TRAVEL' as const, label: 'Viajes' },
      { id: 'OTHERS' as const, label: 'Otros' },
    ],
  },
  {
    id: 'SAVINGS' as const,
    label: 'Ahorros',
    subcategories: [
      { id: 'VACATIONS' as const, label: 'Vacaciones' },
      { id: 'GIFTS' as const, label: 'Regalos' },
      { id: 'EMERGENCY_FUND' as const, label: 'Fondo de Emergencia' },
      { id: 'BIG_PURCHASE' as const, label: 'Compra Grande' },
      { id: 'OTHERS' as const, label: 'Otros' },
    ],
  },
  {
    id: 'INVESTMENTS' as const,
    label: 'Inversiones',
    subcategories: [
      { id: 'POST_TAX_RETIREMENT' as const, label: 'Retiro Post-Impuestos' },
      { id: 'STOCKS' as const, label: 'Acciones' },
      { id: 'INDEX_FUNDS' as const, label: 'Fondos Indexados' },
      { id: 'CRYPTO' as const, label: 'Criptomonedas' },
      { id: 'OTHERS' as const, label: 'Otros' },
    ],
  },
] as const

// Types
export type Category = (typeof CATEGORIES)[number]
export type CategoryId = Category['id']
export type Subcategory<C extends CategoryId> = Extract<
  Category,
  { id: C }
>['subcategories'][number]
export type SubcategoryId<C extends CategoryId> = Subcategory<C>['id']

// Helpers
export const getCategoryById = (id: CategoryId) =>
  CATEGORIES.find((c) => c.id === id)!

export const getSubcategoriesById = (id: CategoryId) =>
  getCategoryById(id).subcategories

export const getCategoryLabel = (id: CategoryId) => getCategoryById(id).label

export const getSubcategoryLabel = <C extends CategoryId>(
  categoryId: C,
  subcategoryId: SubcategoryId<C>,
) => getSubcategoriesById(categoryId).find((s) => s.id === subcategoryId)!.label

// Optional: pre-built Map for O(1) lookups if needed
export const CATEGORY_MAP = new Map(CATEGORIES.map((c) => [c.id, c]))
