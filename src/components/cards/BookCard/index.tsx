import { BookProps } from '@/@types/book'
import { StarsRating } from '@/components/shared/StarsRating'
import {
  BookCover,
  BookTitleAndAuthor,
  BookContentWrapper,
  BookCardBox,
  RatingWrapper,
} from './styles'
import { getBookRatingsNumber } from '@/utils/getBookRatingsNumber'
import { ReadNotice } from '@/styles/shared'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

interface BookCardProps {
  book: BookProps
  onOpenDetails: () => void
  size?: string
}

export function BookCard({ book, onOpenDetails, size = '' }: BookCardProps) {
  return (
    <BookCardBox className={size} onClick={() => onOpenDetails()}>
      <BookCover className={size} src={book.coverUrl} />
      <BookContentWrapper>
        {book?.readingStatus && (
          <ReadNotice className={book.readingStatus}>
            <FontAwesomeIcon icon={faBookmark} />
          </ReadNotice>
        )}
        <BookTitleAndAuthor className={size}>
          <h2>{book.name}</h2>
          <p>{book.author}</p>
        </BookTitleAndAuthor>
        <RatingWrapper>
          <p>{getBookRatingsNumber(book)}</p>
          <StarsRating size={size} rating={book?.rate ?? 0} />
        </RatingWrapper>
      </BookContentWrapper>
    </BookCardBox>
  )
}
