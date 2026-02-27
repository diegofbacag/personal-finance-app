import { NextResponse } from 'next/server'

import * as bcrypt from 'bcrypt'

import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, first_name } = body

    if (!email || !password || !first_name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      )
    }

    const existingCredential = await prisma.credential.findUnique({
      where: { email },
    })

    if (existingCredential) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 },
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        first_name,
        credential: {
          create: {
            email,
            password: hashedPassword,
          },
        },
      },
    })
    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
