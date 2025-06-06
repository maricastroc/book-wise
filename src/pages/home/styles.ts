import { styled } from '@/styles'

export const HomePageContent = styled('div', {
  marginTop: '2.5rem',
  display: 'flex',
  flexDirection: 'column-reverse',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  paddingBottom: '2.5rem',

  '@media (min-width: 768px)': {
    justifyContent: 'flex-start',
    overflowY: 'scroll',
  },

  '@media (min-width: 1024px)': {
    height: '82vh',
  },

  '@media (min-width: 1200px)': {
    overflowY: 'hidden',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '2.5rem',
    height: '82vh',
  },

  '@media (min-width: 1440px)': {
    gap: '3rem',
  },
})

export const LastRatingsWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',

  '@media (min-width: 768px)': {
    paddingRight: '1rem',
  },

  '@media (min-width: 1200px)': {
    overflowY: 'scroll',
    height: '100%',
  },
})

export const UserLatestReadingContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '1rem',
  marginBottom: '2rem',
})

export const UserLatestReadingTitle = styled('p', {
  fontSize: '$sm',
  marginBottom: '1rem',
})

export const LastRatingsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  minWidth: '100%',
})

export const LastRatingsContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  width: '100%',
})

export const LastRatingsTitle = styled('p', {
  fontSize: '$sm',
})

export const PopularBooksWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '2rem',
  width: '100%',
  gap: '1rem',

  '@media (min-width: 768px)': {
    paddingRight: '1rem',
  },

  '@media (min-width: 1200px)': {
    marginTop: 0,
    marginBottom: 0,
    width: '40rem',
    overflowY: 'scroll',
    height: '100%',
  },
})

export const PopularBooksTitle = styled('div', {
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',

  p: {
    fontSize: '$sm',
  },

  button: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '$sm',
    color: '$purple100',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',

    svg: {
      fontSize: '1rem',
      color: '$purple100',
      marginLeft: '0.4rem',
    },

    '&:hover': {
      filter: 'brightness(1.4)',
      transition: '200ms all',
    },
  },
})

export const PopularBooksContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',

  '@media (min-width: 680px)': {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },

  '@media (min-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
  },

  '@media (min-width: 840px)': {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },

  '@media (min-width: 1200px)': {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    height: '100%',
    paddingRight: '1rem',
  },
})
