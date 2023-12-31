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
  ReadNotice,
} from './styles'
import { RatingWithUserAndBook } from '@/pages/home/index.page'
import { StarsRating } from '../StarsRating'
import { getDateFormattedAndRelative } from '@/utils/timeFormatter'
import { useRouter } from 'next/router'

interface ReviewCardProps {
  rating: RatingWithUserAndBook
  onClick: () => void
}

export function ReviewCard({ rating, ...rest }: ReviewCardProps) {
  const { dateFormatted, dateRelativeToNow, dateString } =
    getDateFormattedAndRelative(rating.created_at)

  const avatarUrl = rating.user.avatar_url || 'https://github/octocat.png'

  const router = useRouter()

  return (
    <Container>
      {rating.alreadyRead && (
        <ReadNotice>
          <p>READ</p>
        </ReadNotice>
      )}
      <Header>
        <UserInfo>
          <Avatar
            avatarUrl={avatarUrl}
            onClick={() => {
              router.push(`/profile/${rating.user.id}`)
            }}
          />
          <NameAndDate>
            <p>{rating.user.name}</p>
            <time title={dateFormatted} dateTime={dateString}>
              {dateRelativeToNow}
            </time>
          </NameAndDate>
        </UserInfo>
        <StarsRating rating={rating.rate} />
      </Header>
      <Separator />
      <BookContainer {...rest}>
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
