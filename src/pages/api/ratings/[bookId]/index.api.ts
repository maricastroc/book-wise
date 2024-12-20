import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { buildNextAuthOptions } from '../../auth/[...nextauth].api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).end()
  }

  const bookId = String(req.query.bookId)

  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
  })

  if (!book) {
    return res.status(400).json({ message: 'Book does not exist.' })
  }

  const createRatingBody = z.object({
    description: z.string(),
    bookId: z.string(),
    userId: z.string(),
    rate: z.number(),
  })

  const { description, userId, rate } = createRatingBody.parse({
    bookId,
    userId: session.user?.id,
    ...req.body,
  })

  const rating = await prisma.rating.create({
    data: {
      description,
      bookId,
      userId,
      rate,
    },
    include: {
      user: true,
    },
  })

  await prisma.readingStatus.upsert({
    where: {
      userId_bookId: {
        userId,
        bookId,
      },
    },
    update: {
      status: 'READ',
    },
    create: {
      userId,
      bookId,
      status: 'READ',
    },
  })

  return res.status(201).json(rating)
}
