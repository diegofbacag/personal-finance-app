import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

import { prisma } from '@/lib/prisma'

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return new Response('Unauthorized', { status: 401 })
    }

    const { id } = await params

    await prisma.transaction.update({
      where: { id, userId: session.user.id },
      data: { deleted_at: new Date() },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
