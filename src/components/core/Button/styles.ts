// styles.ts
import { styled } from '@/styles'

export const StyledButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.7rem',
  cursor: 'pointer',
  padding: '0.875rem 0.6rem',
  fontSize: '0.9375rem',
  border: '1px solid transparent',
  width: '100%',
  transition: 'all 200ms ease',
  borderRadius: 8,

  '&.smaller': {
    padding: '0.4rem',
    fontSize: '0.85rem',
    width: '6rem',
  },

  svg: {
    transition: '200ms ease',
  },

  variants: {
    variant: {
      default: {
        color: '$gray100',
        backgroundColor: '$purple200',
        transition: 'all 200ms ease',

        svg: {
          color: '$gray100',
        },

        '&:not(:disabled):hover': {
          color: '$gray800',
          backgroundColor: '$gray100',

          svg: {
            color: '$gray800',
          },
        },
      },

      'outline-white': {
        color: '$gray100',
        backgroundColor: 'transparent',
        border: '1px solid $gray100',
        transition: 'all 200ms ease',

        '&:not(:disabled):hover': {
          color: '$gray100',
          backgroundColor: '$purple200',
          borderColor: '$purple200',
        },
      },

      'solid-white': {
        backgroundColor: '$gray100',
        border: '1px solid $gray100',
        transition: 'all 200ms ease',

        '&:not(:disabled):hover': {
          color: '$gray100',
          backgroundColor: '$purple200',
          borderColor: '$purple200',

          svg: {
            color: '$gray100',
          },
        },
      },

      delete: {
        color: '$gray100',
        backgroundColor: '$red300',
        transition: 'all 200ms ease',

        '&:not(:disabled):hover': {
          color: '$gray800',
          backgroundColor: '$gray100',
        },
      },
    },
  },

  defaultVariants: {
    variant: 'default',
  },

  '&:disabled': {
    backgroundColor: '$blue600',
    border: 'solid 1px $blue600',
    color: '$gray100',
    cursor: 'not-allowed !important',

    svg: {
      color: '$gray100',
    },
  },
})
