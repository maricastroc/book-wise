import {
  CloseButton,
  Container,
  ContainerOverlay,
  LateralMenuContainer,
  RatingsContainer,
  RatingsContent,
  RatingsContentTitle,
} from './styles'
import { BookCard } from './components/BookCard'
import { X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { Rating as RatingInfo, User as UserPrisma } from '@prisma/client'
import { LateralRatingCard } from './components/LateralRatingCard'
import { useSession } from 'next-auth/react'
import { RatingCardForm } from './components/RatingCardForm'
import * as Dialog from '@radix-ui/react-dialog'
import { LoginModal } from '../LoginModal'
import { BookProps } from '@/@types/book'
import { CategoryProps } from '@/@types/category'

interface BookReviewsSidebarProps {
  book: BookProps | null
  onClose: () => void
}

interface RatingProps extends RatingInfo {
  user: UserPrisma
}

export function LateralMenu({ book, onClose }: BookReviewsSidebarProps) {
  const [ratings, setRatings] = useState<RatingProps[]>([])

  const [openReviewForm, setOpenReviewForm] = useState(false)

  const session = useSession()
  console.log(session)

  useEffect(() => {
    const loadRatings = async () => {
      if (book) {
        try {
          const response = await api.get(`/books/${book.id}`)
          if (response.data) {
            setRatings(response.data.book.ratings)
          }
        } catch (err) {
          console.error(err)
        }
      }
    }

    loadRatings()
  }, [book])

  return (
    <Container>
      <CloseButton onClick={() => onClose()}>
        <X />
      </CloseButton>
      <ContainerOverlay onClick={() => onClose()} />
      <LateralMenuContainer>
        {book && (
          <BookCard
            name={book.name}
            author={book.author}
            coverUrl={book.coverUrl}
            rating={book.rate ?? 0}
            ratingsNumber={book?.ratings?.length ?? 0}
            totalPages={book.totalPages}
            categories={book.categories as CategoryProps[]}
          />
        )}
        <RatingsContainer>
          <RatingsContentTitle>
            <p>Ratings</p>
            {session.data?.user ? (
              <span onClick={() => setOpenReviewForm(true)}>Review</span>
            ) : (
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <span>Review</span>
                </Dialog.Trigger>
                <LoginModal />
              </Dialog.Root>
            )}
          </RatingsContentTitle>
          {session.data?.user && openReviewForm && book && (
            <RatingCardForm
              avatarUrl={session.data?.user?.avatarUrl ?? ''}
              name={session.data?.user.name}
              onClose={() => setOpenReviewForm(false)}
              onCloseLateralMenu={() => onClose()}
              bookId={book.id}
              userId={session.data?.user.id}
            />
          )}
          <RatingsContent>
            {ratings?.map((rating) => (
              <LateralRatingCard
                key={rating.id}
                rating={rating}
                onCloseLateralMenu={() => onClose()}
              />
            ))}
          </RatingsContent>
        </RatingsContainer>
      </LateralMenuContainer>
    </Container>
  )
}
