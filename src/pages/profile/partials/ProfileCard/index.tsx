import { useRef, useState } from 'react'
import { Plus } from 'phosphor-react'

import { getDateFormattedAndRelative } from '@/utils/timeFormatter'
import { useAppContext } from '@/contexts/AppContext'
import { RatingProps } from '@/@types/rating'
import { BookProps } from '@/@types/book'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useScreenSize } from '@/hooks/useScreenSize'

import {
  BookDetailsContainer,
  BookSummaryWrapper,
  BookCover,
  ProfileCardBody,
  DividerLine,
  ProfileCardHeader,
  ProfileCardBox,
  BookTitleAndAuthor,
  ProfileCardWrapper,
  EmptyCardContent,
  RatingVoteWrapper,
} from './styles'

import { StarsRating } from '@/components/shared/StarsRating'
import { TextBox } from '@/components/shared/TextBox'
import { RatingCardForm } from '@/components/shared/RatingCardForm'
import { DropdownActions } from '@/components/shared/DropdownActions.tsx'
import { ArchivedWarning } from '@/components/shared/ArchivedWarning'
import { useBookContext } from '@/contexts/BookContext'
import { RatingVoteSection } from '@/components/shared/RatingVoteSection'

interface ProfileCardProps {
  book: BookProps
  rating: RatingProps
  userId: string | undefined
  onSelect: () => void
}

export function ProfileCard({
  book,
  rating,
  userId,
  onSelect,
}: ProfileCardProps) {
  const { dateFormatted, dateRelativeToNow, dateString } =
    getDateFormattedAndRelative(rating.createdAt)

  const [isEditUserReviewCardOpen, setIsEditUserReviewCardOpen] =
    useState(false)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const { loggedUser } = useAppContext()

  const dropdownRef = useRef<HTMLDivElement>(null)

  const buttonRef = useRef<HTMLButtonElement>(null)

  const isMobile = useScreenSize(480)

  const isFromLoggedUser = userId === loggedUser?.id

  const isEditDisabled = !['read', 'didNotFinish'].includes(
    book.readingStatus || '',
  )

  const belongsToLoggedUser = rating.userId === loggedUser?.id

  const { status } = useBookContext()

  useClickOutside([dropdownRef, buttonRef], () => {
    if (!isDeleteModalOpen) {
      setIsDropdownOpen(false)
    }
  })

  return isEditUserReviewCardOpen ? (
    <RatingCardForm
      isEdit
      rating={rating}
      book={book}
      onClose={() => {
        setIsEditUserReviewCardOpen(false)
      }}
    />
  ) : (
    <>
      <ProfileCardWrapper>
        <time title={dateFormatted} dateTime={dateString}>
          {dateRelativeToNow}
        </time>
        <ProfileCardBox>
          <ProfileCardHeader>
            <StarsRating rating={rating.rate} />
            <RatingVoteWrapper>
              {!isMobile && (
                <RatingVoteSection
                  style={{
                    marginTop: 0,
                    paddingRight: `${belongsToLoggedUser ? '1rem' : '0'}`,
                  }}
                  rating={rating}
                />
              )}
              {belongsToLoggedUser && (
                <DropdownActions
                  ratingId={rating.id}
                  dropdownRef={dropdownRef}
                  buttonRef={buttonRef}
                  onToggleEditSection={(value) =>
                    setIsEditUserReviewCardOpen(value)
                  }
                  isDropdownOpen={isDropdownOpen}
                  onToggleDropdown={(value: boolean) =>
                    setIsDropdownOpen(value)
                  }
                  isDeleteSectionOpen={isDeleteModalOpen}
                  onToggleDeleteSection={(value: boolean) =>
                    setIsDeleteModalOpen(value)
                  }
                />
              )}
            </RatingVoteWrapper>
          </ProfileCardHeader>

          {book && (
            <>
              <ProfileCardBody>
                <BookDetailsContainer>
                  <BookCover src={book.coverUrl} alt="" onClick={onSelect} />
                  <BookSummaryWrapper>
                    <BookTitleAndAuthor>
                      <h2>{book.name}</h2>
                      <p>{book.author}</p>
                    </BookTitleAndAuthor>
                    {!isMobile &&
                      (rating.description !== '' ? (
                        <TextBox description={rating.description} />
                      ) : loggedUser?.id === rating.userId &&
                        !isEditDisabled ? (
                        <EmptyCardContent
                          onClick={() => setIsEditUserReviewCardOpen(true)}
                        >
                          Add your Review
                          <Plus />
                        </EmptyCardContent>
                      ) : (
                        <EmptyCardContent disabled>
                          No description available.
                        </EmptyCardContent>
                      ))}
                  </BookSummaryWrapper>
                </BookDetailsContainer>

                {isMobile &&
                  (rating.description !== '' ? (
                    <>
                      <DividerLine />
                      <TextBox description={rating.description} />
                    </>
                  ) : (
                    <>
                      <DividerLine />
                      <EmptyCardContent
                        onClick={() => setIsEditUserReviewCardOpen(true)}
                      >
                        Add your Review
                        <Plus />
                      </EmptyCardContent>
                    </>
                  ))}
                {isFromLoggedUser && (
                  <ArchivedWarning
                    style={{ margin: '0.85 0 0' }}
                    activeStatus={status.active || null}
                  />
                )}
                {isMobile && (
                  <RatingVoteWrapper>
                    <RatingVoteSection rating={rating} />
                  </RatingVoteWrapper>
                )}
              </ProfileCardBody>
            </>
          )}
        </ProfileCardBox>
      </ProfileCardWrapper>
    </>
  )
}
