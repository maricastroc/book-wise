import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',

    ':focus': {
      outline: 'transparent',
      boxShadow: '0 0 0 2px rgba(37, 45, 74, 1)',
    },
  },

  body: {
    backgroundColor: '$gray800',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',
    minHeight: '100%',
  },

  'body, input, textarea, button': {
    fontFamily: 'Nunito sans, sans-serif',
    fontWeight: 400,
  },
})
