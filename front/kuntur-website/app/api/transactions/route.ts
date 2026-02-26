import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      include: { subcategory: { include: { category: true } } },
    })

    return NextResponse.json({ data: transactions }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      amount,
      description,
      date,
      tag,
      userId,
      subcategoryCode,
      categoryCode,
    } = body

    const category = await prisma.category.findUniqueOrThrow({
      where: { code: categoryCode },
    })

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        description,
        date,
        tag,
        user: { connect: { id: userId } },
        subcategory: {
          connect: {
            code_categoryId: {
              code: subcategoryCode,
              categoryId: category.id,
            },
          },
        },
      },
      include: {
        subcategory: { include: { category: true } },
      },
    })

    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
