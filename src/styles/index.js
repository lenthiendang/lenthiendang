import { createGlobalStyle } from 'styled-components';

import styles from './styles';
import colors from './colors';
import devices from './devices';
import scrollBar from './scrollBar';

export const theme = {
  colors,
  devices,
  scrollBar,
  ...styles,
};
