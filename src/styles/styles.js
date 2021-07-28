import colors from './colors';

export const joinCss = (obj) =>
  Object.entries(obj)
    .map((entry) => `${entry[0]}: ${entry[1]}`)
    .join(';');

export default {
  boxCenter: `
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  opacity: {
    100: '04',
    200: '23',
    300: '42',
    400: '61',
    500: '80',
    600: '9F',
    700: 'BE',
    800: 'DD',
    900: 'FC',
  },
  boxShadow: (color) => `
    box-shadow: 0 0.25rem 1.5rem 0 ${color};
  `,

  tranEaseIn: 'transition: 0.15s ease-in',
  animateEaseIn: 'animation: all 3s ease-in',
  borderRadius: {
    sm: { 'border-radius': '0.275rem' },
    md: { 'border-radius': '0.375rem' },
    lg: { 'border-radius': '0.5rem' },
  },
  spacing: {
    xxxs: '0.15rem',
    xxs: '0.25rem',
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1.25rem',
    lg: '2rem',
    xl: '3.25rem',
    xxl: '5.25rem',
    xxxl: '8.5rem',
  },
  textBold: 'font-weight: 700',
  textWhite: { color: colors.white },
  size: {
    xxxs: '3rem',
    xxs: '4.5rem',
    xs: '6rem',
    sm: '9rem',
    md: '12rem',
    lg: '16rem',
    xl: '24rem',
    xxl: '32rem',
    xxxl: '48rem',
  },
  textSize: {
    xxxs: {
      'font-size': '0.69rem',
      'line-height': '1.5875rem',
      'letter-spacing': '-0.03rem',
    },
    xxs: { 'font-size': '0.813rem', 'line-height': '1.6875rem' },
    xs: { 'font-size': '0.885rem', 'line-height': '1.775rem' },
    sm: { 'font-size': '1rem', 'line-height': '2rem' },
    md: { 'font-size': '1.25rem', 'line-height': '2.375rem' },
    lg: { 'font-size': '1.625rem', 'line-height': '2.875rem' },
    xl: { 'font-size': '2.063rem', 'line-height': '3.5625rem' },
    xxl: { 'font-size': '2.625rem', 'line-height': '4.375rem' },
  },
};
