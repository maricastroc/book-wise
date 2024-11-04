import { styled } from '../../styles'

export const Container = styled('div', {
  cursor: 'pointer',
  display: 'flex',
  padding: '1rem',
  backgroundColor: '$gray700',
  borderRadius: 8,
  alignItems: 'stretch',
  gap: '1.25rem',
  width: '100%',
  position: 'relative',

  '@media (min-width: 1200px)': {
    padding: '1.2rem',
  },

  '&:hover': {
    backgroundColor: '$gray600',
    transition: '200ms ease-in-out',
  },
})

export const BookInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
})

export const BookData = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',

  h2: {
    fontSize: '0.9rem',
    whiteSpace: 'break-spaces',
    overflow: 'scroll',
    position: 'relative',
  },

  p: {
    color: '$gray400',
    fontSize: '0.85rem',
  },
})

export const BookCover = styled('img', {
  width: '4.5rem',
  height: 'auto',
  borderRadius: 8,
  outline: '1px solid rgba(141, 149, 175, 0.6)',
  outlineOffset: 3,
})

export const ReadNotice = styled('div', {
  display: 'flex',
  position: 'absolute',
  top: 0,
  right: 0,
  padding: '0.2rem 0.5rem',
  fontSize: '$xs',
  borderRadius: '0 8px 0 8px',
  backgroundColor: '$green300',
  color: '$green100',
})

export const InfosContainer = styled('div', {
  marginTop: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.2rem',

  p: {
    color: '$gray400',
    fontSize: '0.8rem',
  },
})
