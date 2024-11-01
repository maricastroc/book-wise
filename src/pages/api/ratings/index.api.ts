// === Retorna todas as avaliações ===
// /api/ratings

import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const ratings = await prisma.rating.findMany({
      include: {
        book: {
          select: {
            coverUrl: true,
            name: true,
            author: true,
          },
        },
        user: {
          select: {
            id: true,
            avatarUrl: true,
            name: true,
          },
        },
      },
    })

    const ratingsOutput = ratings.map((rating) => ({
      id: rating.id,
      createdAt: rating.createdAt,
      rate: rating.rate,
      description: rating.description,
      book: {
        coverURL: rating.book.coverUrl,
        name: rating.book.name,
        author: rating.book.author,
      },
      user: {
        id: rating.user.id,
        avatarURL: rating.user.avatarUrl,
        name: rating.user.name,
      },
    }))

    return res.status(200).json(ratingsOutput)
  } else if (req.method === 'DELETE') {
    const { id } = req.body

    await prisma.rating.delete({
      where: {
        id,
      },
    })

    return res.status(200).json({ message: 'Review successfully deleted!' })
  } else if (req.method === 'PUT') {
    const { id, description } = req.body
    const updatedPost = await prisma.rating.update({
      where: {
        id,
      },
      data: {
        description,
      },
    })

    return res.status(200).json(updatedPost)
  } else {
    return res.status(405).end()
  }
}
