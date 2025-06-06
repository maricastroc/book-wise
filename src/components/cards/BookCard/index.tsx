import { BookProps } from '@/@types/book'
import { StarsRating } from '@/components/shared/StarsRating'
import {
  BookCover,
  BookTitleAndAuthor,
  BookContentWrapper,
  BookCardBox,
  RatingWrapper,
  FooterWrapper,
} from './styles'
import { getBookRatingsNumber } from '@/utils/getBookRatingsNumber'
import { ReadingStatusTag } from '@/components/shared/ReadingStatusTag'
import { ReadingStatus } from '@/@types/reading-status'

interface BookCardProps {
  book: BookProps
  onOpenDetails: () => void
  onClose?: () => void
}

export function BookCard({ book, onOpenDetails }: BookCardProps) {
  return (
    <BookCardBox
      onClick={() => {
        onOpenDetails()
      }}
    >
      <BookCover src={book.coverUrl} onClick={() => onOpenDetails()} />
      <BookContentWrapper>
        {book?.readingStatus && (
          <ReadingStatusTag
            readingStatus={book.readingStatus as ReadingStatus}
          />
        )}
        <BookTitleAndAuthor>
          <h2>{book.name}</h2>
          <p>{book.author}</p>
        </BookTitleAndAuthor>
        <FooterWrapper>
          <RatingWrapper>
            <p>{getBookRatingsNumber(book)}</p>
            <StarsRating rating={book?.rate ?? 0} />
          </RatingWrapper>
        </FooterWrapper>
      </BookContentWrapper>
    </BookCardBox>
  )
}
