import { css } from 'styled-components';
import colors from './colors';

const scrollBar = {
  '&::-webkit-scrollbar': {
    width: '0.62rem',
    height: '0.62rem',
    zIndex: '10',
  },
  '&::-webkit-scrollbar-track': {
    width: '6px',
    height: '0.62rem',
    boxShadow: 'inset 0 0 5px grey',
    borderRadius: '30rem',
  },
  '&::-webkit-scrollbar-thumb': {
    height: '0.62rem',
    background: `${colors.primary[500]}aa`,
    borderRadius: '30rem',
  },
};

export const scrollBarDark = {
  '&::-webkit-scrollbar': {
    width: '0.62rem',
    height: '0.62rem',
  },
  '&::-webkit-scrollbar-track': {
    width: '6px',
    height: '0.62rem',
    boxShadow: 'inset 0 0 5px grey',
    borderRadius: '30rem',
  },
  '&::-webkit-scrollbar-thumb': {
    height: '0.62rem',
    width: '0.3rem',
    background: `${colors.primary[900]}30`,
    borderRadius: '30rem',
  },
};

export default scrollBar;
