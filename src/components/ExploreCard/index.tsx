import { BookProps } from '@/@types/book'
import { StarsRating } from '../StarsRating'
import {
  BookCover,
  BookData,
  BookInfo,
  Container,
  InfosContainer,
  ReadNotice,
} from './styles'
import { getBookTitle } from '@/utils/getBookTitle'
import { getBookRatingsNumber } from '@/utils/getBookRatingsNumber'

interface ExploreCardProps {
  book: BookProps
  onClick: () => void
}

export function ExploreCard({ book, ...rest }: ExploreCardProps) {
  return (
    <Container {...rest}>
      <BookCover alt="" src={book.coverUrl} />
      <BookInfo>
        {book.alreadyRead && (
          <ReadNotice>
            <p>READ</p>
          </ReadNotice>
        )}
        <BookData>
          <h2>{getBookTitle(book)}</h2>
          <p>{book.author}</p>
        </BookData>
        <InfosContainer>
          <p>{getBookRatingsNumber(book)}</p>
          <StarsRating rating={book?.rate ?? 0} />
        </InfosContainer>
      </BookInfo>
    </Container>
  )
}
