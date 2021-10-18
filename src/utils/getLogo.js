import remitexLogo from '../../assets/images/remitexLogo.png';
import deniexLogo from '../../assets/images/deniexLogo.png';

export default () => {
  if (process.env.EXCHANGE === 'remitex.net') {
    return remitexLogo;
  }
  if (process.env.EXCHANGE === 'deniex.com') {
    return deniexLogo;
  }
  return null;
};
