import { styled } from '@/styles'

export const ExplorePageWrapper = styled('div', {
  marginTop: '3rem',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  padding: '0 1rem',
  maxWidth: '100%',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '100vh',
  overflowX: 'hidden',
  minWidth: '100vw',
  paddingBottom: '5rem',

  '@media (min-width: 480px)': {
    marginTop: '5rem',
    paddingBottom: 0,
  },

  '@media (min-width: 768px)': {
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'stretch',
    padding: '0 2rem 0 1rem',
    gap: '2.5rem',
    paddingRight: '2rem',
    paddingLeft: '18rem',
  },

  '@media (min-width: 1024px)': {
    gap: '5rem',
  },
})

export const ExplorePageContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '0 1rem',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '45rem',
  marginTop: '2rem',

  '@media (min-width: 768px)': {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    maxWidth: '100%',
    marginTop: '2rem',
    padding: 0,
  },

  '@media (min-width: 980px)': {
    paddingLeft: '1rem',
  },
})

export const ExplorePageHeading = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  alignSelf: 'start',
  gap: '0.8rem',
  textAlign: 'left',
  marginBottom: '1rem',
  width: '100%',

  '@media (min-width: 1024px)': {
    marginTop: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export const TitleAndSearch = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: '100%',

  '@media (min-width: 768px)': {
    alignItems: 'flex-start',
    marginTop: '0.5rem',
  },

  '@media (min-width: 1024px)': {
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export const HeadingTitle = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.8rem',
  marginBottom: '1.5rem',
  paddingTop: '1.5rem',
  textAlign: 'left',

  h2: {
    fontSize: '1.3rem',
  },

  svg: {
    fontSize: '1.8rem',
    color: '$green100',
  },

  '@media (min-width: 480px)': {
    h2: {
      fontSize: '1.5rem',
    },

    svg: {
      fontSize: '2rem',
      color: '$green100',
    },
  },

  '@media (min-width: 768px)': {
    paddingTop: 0,
  },

  '@media (min-width: 1024px)': {
    marginBottom: 0,
  },
})

export const ExplorePageContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',

  '@media (min-width: 768px)': {
    paddingRight: '1rem',
    justifyContent: 'flex-start',
    overflowY: 'scroll',
  },
})

export const Categories = styled('div', {
  marginTop: '1rem',
  display: 'flex',
  overflowX: 'scroll',
  gap: '0.7rem',
  alignItems: 'center',
  width: '100%',
  paddingBottom: '0.8rem',

  '@media (min-width: 1024px)': {
    paddingBottom: '1.2rem',

    '&::-webkit-scrollbar': {
      width: 2,
      height: 8,
      opacity: 0.6,
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '$gray700',
      boxShadow: 'inset 0 0 0px 6px $gray700',
      opacity: 0.6,
    },
  },
})

export const SelectCategoryButton = styled('button', {
  cursor: 'pointer',
  backgroundColor: 'transparent',
  borderRadius: 16,
  border: 'solid 1px $purple100',
  color: '$purple100',
  padding: '0.3rem 0.8rem',
  fontSize: '0.85rem',
  whiteSpace: 'nowrap',

  '&:hover': {
    transition: '200ms',
    border: 'solid 1px $purple300',
    backgroundColor: '$purple300',
    color: '$white',
  },

  '&.loading': {
    cursor: 'not-allowed',
    opacity: 0.7,

    '&:hover': {
      backgroundColor: 'transparent',
      border: 'solid 1px $purple100',
      color: '$purple100',
      opacity: 0.7,
    },
  },

  variants: {
    selected: {
      true: {
        border: 'solid 1px $purple300',
        backgroundColor: '$purple300',
        color: '$white',
      },
    },
  },

  '@media (min-width: 768px)': {
    padding: '0.4rem 1rem',
    fontSize: '0.95rem',
  },
})

export const BooksContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '2rem',
  marginTop: '1rem',
  width: '100%',
  marginBottom: '2rem',

  '@media (min-width: 480px)': {
    gap: '1.5rem',
  },

  '@media (min-width: 580px)': {
    gridTemplateColumns: '1fr 1fr',
  },

  '@media (min-width: 768px)': {
    gridTemplateColumns: '1fr',
  },

  '@media (min-width: 910px)': {
    gridTemplateColumns: '1fr 1fr',
  },

  '@media (min-width: 1400px)': {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
})
