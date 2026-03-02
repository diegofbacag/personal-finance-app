import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

import { prisma } from '@/lib/prisma'

interface TransactionDto {
  amount: number
  date: string
  created_at: Date
  description?: string
  id: string
  subcategory_code: string
  subcategory_name: string
  category_code: string
  category_name: string
  tag?: string
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session?.user?.id) {
      return new Response('Unauthorized', { status: 401 })
    }

    const transactions = await prisma.transaction.findMany({
      where: { userId: session.user.id },
      include: { subcategory: { include: { category: true } } },
    })

    const dtoTransactions: TransactionDto[] = transactions.map((tx) => ({
      id: tx.id,
      amount: tx.amount,
      date: tx.date,
      created_at: tx.created_at,
      description: tx.description ?? undefined,
      tag: tx.tag ?? undefined,
      subcategory_code: tx.subcategory.code,
      subcategory_name: tx.subcategory.name,
      category_code: tx.subcategory.category.code,
      category_name: tx.subcategory.category.name,
    }))

    console.log('transactions', transactions)

    return NextResponse.json(
      { data: { transactions: dtoTransactions } },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session?.user?.id) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { amount, description, date, tag, subcategory, category } = body

    console.log('body', body)

    const foundCategory = await prisma.category.findUniqueOrThrow({
      where: { code: category },
    })

    console.log('category', category)

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        description,
        date,
        user: { connect: { id: session.user.id } },
        subcategory: {
          connect: {
            code_categoryId: {
              code: subcategory,
              categoryId: foundCategory.id,
            },
          },
        },
      },
      include: {
        subcategory: { include: { category: true } },
      },
    })

    const transactionDto: TransactionDto = {
      id: transaction.id,
      amount: transaction.amount,
      date: transaction.date,
      created_at: transaction.created_at,
      description: transaction.description ?? undefined,
      tag: transaction.tag ?? undefined,
      subcategory_code: transaction.subcategory.code,
      subcategory_name: transaction.subcategory.name,
      category_code: transaction.subcategory.category.code,
      category_name: transaction.subcategory.category.name,
    }

    console.log('transactions', transaction)

    return NextResponse.json({ transaction: transactionDto }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
