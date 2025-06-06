/* eslint-disable react-hooks/exhaustive-deps */
import { LibraryBookCard } from '../LibraryBookCard'
import {
  BooksGridMain,
  BooksGridContent,
  BooksGridWrapper,
  BooksGridHeader,
  TagContainer,
} from './styles'
import { OutlineButton } from '@/components/core/OutlineButton'
import { CaretLeft } from 'phosphor-react'
import { Pagination } from '@/components/shared/Pagination'
import { useEffect, useRef, useState } from 'react'
import { BookProps } from '@/@types/book'
import { formatStatusForAPI } from '@/utils/formatStatusToAPI'
import { SkeletonLibraryCard } from '@/components/skeletons/SkeletonLibraryCard'
import { SearchBar } from '@/components/shared/SearchBar'
import { usePerPage } from '@/hooks/useLibraryBooksPerPage'
import useRequest from '@/hooks/useRequest'
import { LateralMenu } from '@/components/shared/LateralMenu'
import { usePaginationAndSearch } from '@/hooks/usePaginationAndSearchParams'
import { ReadingStatusTag } from '@/components/shared/ReadingStatusTag'
import { BookProvider } from '@/contexts/BookContext'

interface Props {
  userId: string | undefined
  selectedStatus: 'read' | 'reading' | 'wantToRead' | 'didNotFinish'
  selectedLabel: string
  refreshKey: number
  setSelectedStatus: (
    value: 'read' | 'reading' | 'wantToRead' | 'didNotFinish' | null,
  ) => void
  setSelectedLabel: (value: string | null) => void
}

export const BooksGridByStatus = ({
  userId,
  selectedStatus,
  selectedLabel,
  refreshKey,
  setSelectedLabel,
  setSelectedStatus,
}: Props) => {
  const gridRef = useRef<HTMLDivElement>(null)

  const [totalPages, setTotalPages] = useState(1)

  const [selectedBook, setSelectedBook] = useState<BookProps | null>(null)

  const [openLateralMenu, setOpenLateralMenu] = useState(false)

  const [filteredBooks, setFilteredBooks] = useState<BookProps[] | []>([])

  const {
    currentPage,
    setCurrentPage,
    search,
    setSearch,
    searchTerm,
    perPage,
  } = usePaginationAndSearch({ perPage: usePerPage() })

  const { data, mutate, isValidating } = useRequest<{
    books: BookProps[]
    pagination: {
      page: number
      perPage: number
      total: number
      totalPages: number
    }
  } | null>(
    {
      url: `library/all_books_by_status`,
      method: 'GET',
      params: {
        ...(searchTerm?.length ? { search: searchTerm } : {}),
        page: currentPage,
        perPage,
        userId,
        status: formatStatusForAPI(selectedStatus),
      },
    },
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    },
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)

    if (gridRef.current) {
      const offset = 200
      const top =
        gridRef.current.getBoundingClientRect().top + window.scrollY - offset

      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    if (data) {
      setFilteredBooks(data.books)
      setTotalPages(data.pagination.totalPages)
    }
  }, [data])

  useEffect(() => {
    mutate()
  }, [refreshKey])

  return (
    <BooksGridWrapper>
      {openLateralMenu && selectedBook && (
        <BookProvider
          bookId={selectedBook.id}
          onUpdateBook={async () => {
            await mutate()
          }}
          onUpdateRating={async () => {
            await mutate()
          }}
        >
          <LateralMenu onClose={() => setOpenLateralMenu(false)} />
        </BookProvider>
      )}
      <BooksGridHeader>
        <TagContainer>
          <ReadingStatusTag type="relative" readingStatus={selectedStatus} />
          {selectedLabel}
        </TagContainer>

        <OutlineButton
          onClick={() => {
            setSelectedStatus(null)
            setSelectedLabel('')
          }}
        >
          <CaretLeft />
          Go Back
        </OutlineButton>
      </BooksGridHeader>
      <SearchBar
        fullWidth
        placeholder="Search for Author or Title"
        search={search}
        onChange={(e) => {
          setCurrentPage(1)
          setSearch(e.target.value)
        }}
        onClick={() => {
          setCurrentPage(1)
          setSearch('')
        }}
      />
      <BooksGridMain>
        <BooksGridContent ref={gridRef}>
          {isValidating || !data
            ? Array.from({ length: perPage }).map((_, index) => (
                <SkeletonLibraryCard key={index} />
              ))
            : filteredBooks?.map((book) => {
                return (
                  <LibraryBookCard
                    key={book.id}
                    book={book}
                    onSelect={() => {
                      setOpenLateralMenu(true)
                      setSelectedBook(book)
                    }}
                  />
                )
              })}
        </BooksGridContent>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </BooksGridMain>
    </BooksGridWrapper>
  )
}
