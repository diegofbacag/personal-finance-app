import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

import { prisma } from '@/lib/prisma'

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

    console.log('transactions', transactions)

    return NextResponse.json({ data: transactions }, { status: 200 })
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
        tag: 'false',
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

    console.log('transactions', transaction)

    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
