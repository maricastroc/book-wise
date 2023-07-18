import { Avatar } from '../Avatar'
import {
  BookContainer,
  BookCover,
  BookDetails,
  BookDescription,
  BookInfo,
  Container,
  Header,
  NameAndDate,
  Separator,
  UserInfo,
} from './styles'
import { RatingWithUserAndBook } from '@/pages/home/index.page'
import { StarsRating } from '../StarsRating'

interface ReviewCardProps {
  rating: RatingWithUserAndBook
}

export function ReviewCard({ rating }: ReviewCardProps) {
  const avatarUrl = rating.user.avatar_url || 'https://github/octocat.png'

  return (
    <Container>
      <Header>
        <UserInfo>
          <Avatar avatarUrl={avatarUrl} />
          <NameAndDate>
            <p>{rating.user.name}</p>
            <span>Today</span>
          </NameAndDate>
        </UserInfo>
        <StarsRating rating={rating.rate} />
      </Header>
      <Separator />
      <BookContainer>
        <BookCover src={rating.book.cover_url} alt="" />
        <BookDetails>
          <BookInfo>
            <h2>{rating.book.name}</h2>
            <p>{rating.book.author}</p>
          </BookInfo>
          <Separator />
          <BookDescription>
            <p>{rating.description}</p>
          </BookDescription>
        </BookDetails>
      </BookContainer>
    </Container>
  )
}
