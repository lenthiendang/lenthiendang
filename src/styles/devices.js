export const breakpoints = {
  mobile: 480,
  tablet: 768,
  laptop: 992,
  desktop: 1200,
  widescreen: 1400
};

export default {
  mobile: `@media screen and (min-width: ${breakpoints.mobile}px)`,
  tablet: `@media screen and (min-width: ${breakpoints.tablet}px)`,
  laptop: `@media screen and (min-width: ${breakpoints.laptop}px)`,
  desktop: `@media screen and (min-width: ${breakpoints.desktop}px)`,
  widescreen: `@media screen and (min-width: ${breakpoints.widescreen}px)`
};
