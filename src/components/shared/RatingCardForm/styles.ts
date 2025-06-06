import { styled } from '@/styles'

export const RatingCardFormWrapper = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  backgroundColor: '$gray700',
  margin: '0.5rem auto',
  padding: '0.8rem 1rem',
  borderRadius: 8,
  width: '100%',

  '@media (min-width: 480px)': {
    padding: '1.3rem',
  },
})

export const RatingCardFormHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1rem',
  marginBottom: '0.2rem',

  '@media (min-width: 580px)': {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  '&.profile': {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

export const UserDetailsWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',

  p: {
    fontSize: '0.95rem',
    fontWeight: 'bold',
  },
})

export const ReviewFormWrapper = styled('div', {
  position: 'relative',
  width: '100%',
  backgroundColor: '$gray700',
})

export const ReviewForm = styled('textarea', {
  width: '100%',
  marginTop: '1rem',
  backgroundColor: 'transparent',
  padding: '0.875rem 0.875rem 1.25rem',
  border: '1.5px solid $blue600',
  borderRadius: 8,
  height: 188,
  minHeight: 80,
  color: '$gray300',
  lineHeight: '1.45rem',
  fontSize: '0.9rem',
  resize: 'none',

  '&:focus': {
    outline: 'none',
    boxShadow: 'none',
  },
})

export const FooterWrapper = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: '100%',
})

export const CharacterCounterWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginLeft: '0.2rem',
})

export const CharacterCounter = styled('span', {
  fontSize: '0.75rem',
  color: '$gray100',
  padding: '0.2rem 0',
  marginBottom: '0.2rem',
})

export const UserActionsWrapper = styled('div', {
  marginTop: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.7rem',
  justifyContent: 'flex-end',
  width: '100%',
})
