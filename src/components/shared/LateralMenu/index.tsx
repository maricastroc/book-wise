import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'

import { useAppContext } from '@/contexts/AppContext'

import { BookProps } from '@/@types/book'
import { CategoryProps } from '@/@types/category'

import { DID_NOT_FINISH_STATUS, READ_STATUS } from '@/utils/constants'

import {
  CloseButton,
  LateralMenuWrapper,
  OverlayBackground,
  MenuBody,
  RatingsWrapper,
  RatingsList,
  RatingsListHeader,
} from './styles'

import { MenuBookCard } from './partials/MenuBookCard'
import { UserRatingBox } from './partials/UserRatingBox'
import { ReviewWarningModal } from './partials/ReviewWarningModal'
import { SkeletonLateralMenu } from './partials/SkeletonLateralMenu'

import { RatingCardForm } from '../RatingCardForm'
import { SignInModal } from '@/components/modals/SignInModal'
import { SkeletonRatingCard } from '@/components/skeletons/SkeletonRatingCard'
import { EmptyContainer } from '../EmptyContainer'
import { useBookDetails } from '@/hooks/useBookDetails'

interface LateralMenuProps {
  bookId: string
  onClose: () => void
  onUpdateBook: (book: BookProps) => void
}

export function LateralMenu({
  bookId,
  onClose,
  onUpdateBook,
}: LateralMenuProps) {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false)

  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)

  const [isReviewWarningModalOpen, setIsReviewWarningModalOpen] =
    useState(false)

  const { loggedUser, isSubmitting } = useAppContext()

  const {
    updatedBook,
    bookRatings,
    userRating,
    isValidating,
    onUpdateReview,
    onCreateReview,
    onDeleteReview,
    onUpdateStatus,
  } = useBookDetails(bookId, onUpdateBook)

  const filteredRatings = bookRatings?.filter((rating) => {
    return rating.deletedAt === null
  })

  return (
    <LateralMenuWrapper>
      <OverlayBackground onClick={onClose} />
      <CloseButton onClick={onClose}>
        <X />
      </CloseButton>
      <MenuBody>
        {isValidating || isSubmitting ? (
          <SkeletonLateralMenu />
        ) : (
          <>
            {isSignInModalOpen && (
              <Dialog.Root open={isSignInModalOpen}>
                <SignInModal onClose={() => setIsSignInModalOpen(false)} />
              </Dialog.Root>
            )}

            {isReviewWarningModalOpen && (
              <Dialog.Root open={isReviewWarningModalOpen}>
                <ReviewWarningModal
                  onClose={() => setIsReviewWarningModalOpen(false)}
                />
              </Dialog.Root>
            )}

            {updatedBook && (
              <MenuBookCard
                key={updatedBook.id}
                book={updatedBook}
                categories={updatedBook.categories as CategoryProps[]}
                onUpdateStatus={onUpdateStatus}
                onCreateReview={onCreateReview}
              />
            )}
            <RatingsWrapper>
              <RatingsListHeader>
                <p>Ratings</p>
                {!userRating &&
                  (updatedBook?.readingStatus === READ_STATUS ||
                  updatedBook?.readingStatus === DID_NOT_FINISH_STATUS ? (
                    <span onClick={() => setIsReviewFormOpen(true)}>
                      Review
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        if (loggedUser) {
                          setIsReviewWarningModalOpen(true)
                        } else {
                          setIsSignInModalOpen(true)
                        }
                      }}
                    >
                      Review
                    </span>
                  ))}
              </RatingsListHeader>
              <RatingsList className={isReviewFormOpen ? 'reverse' : ''}>
                {updatedBook && isReviewFormOpen && (
                  <RatingCardForm
                    isEdit={!!userRating}
                    rating={userRating}
                    onClose={() => setIsReviewFormOpen(false)}
                    onUpdateReview={onUpdateReview}
                    onCreateReview={onCreateReview}
                    book={updatedBook}
                  />
                )}
                {!isValidating && !bookRatings?.length ? (
                  <EmptyContainer content="reviews" />
                ) : isValidating ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <SkeletonRatingCard key={index} />
                  ))
                ) : (
                  updatedBook &&
                  filteredRatings?.map((rating) => (
                    <UserRatingBox
                      key={rating.id}
                      book={updatedBook}
                      rating={rating}
                      onUpdateReview={onUpdateReview}
                      onCreateReview={onCreateReview}
                      onDeleteReview={onDeleteReview}
                    />
                  ))
                )}
              </RatingsList>
            </RatingsWrapper>
          </>
        )}
      </MenuBody>
    </LateralMenuWrapper>
  )
}
