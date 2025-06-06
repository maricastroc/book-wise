import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    let searchQuery

    if (req.query.search) {
      searchQuery = String(req.query.search).toLowerCase()
    }

    const ratings = await prisma.rating.findMany({
      where: searchQuery
        ? {
            book: {
              name: {
                contains: searchQuery,
                mode: 'insensitive',
              },
            },
          }
        : {},
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
        votes: true,
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
    const { id, description, rate } = req.body

    if (!id || rate === undefined) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    try {
      const ratingExists = await prisma.rating.findUnique({
        where: { id },
      })

      if (!ratingExists) {
        return res.status(404).json({ message: 'Rating not found' })
      }

      const updatedPost = await prisma.rating.update({
        where: {
          id,
        },
        data: {
          description,
          rate,
        },
        include: {
          user: true,
          votes: true,
        },
      })

      return res
        .status(200)
        .json({ rating: updatedPost, message: 'Rating successfully updated!' })
    } catch (error) {
      return res.status(500).json({ message: 'Error updating rating', error })
    }
  } else if (req.method === 'POST') {
    const { bookId, userId, description, rate, status } = req.body.data

    if (!rate) {
      return res.status(400).json({ message: 'Rating is required.' })
    }

    if (!status) {
      return res.status(400).json({ message: 'Book status is required.' })
    }

    const newRating = await prisma.rating.create({
      data: {
        bookId,
        userId,
        description,
        rate,
      },
      include: {
        user: true,
        votes: true,
      },
    })

    await prisma.readingStatus.upsert({
      where: {
        userId_bookId: { userId, bookId },
      },
      update: {
        status,
      },
      create: {
        userId,
        bookId,
        status,
      },
    })

    return res
      .status(201)
      .json({ rating: newRating, message: 'Rating successfully created!' })
  } else {
    return res.status(405).end()
  }
}
