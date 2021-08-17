import styled from 'styled-components';
import React from 'react';
import { Box } from '@chakra-ui/react';

import theme from '../../../styles';

const StyledButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${theme.spacing.lg};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    position: relative;

    &:hover {
      .sun {
        bottom: 2rem;
        transition: all 1s ease-in-out;
        box-shadow: 0px 0px 10px #ffdc2a;
        /* transform: scale(1.5); */
      }
      .button {
        box-shadow: 0px 0px 36px ${(props) => theme.colors[props.color][400]};
        transition: all 1s ease-in-out;
      }
    }
  }

  .sun {
    position: absolute;
    width: ${(props) => (props.top ? '60px' : '40px')};
    height: ${(props) => (props.top ? '60px' : '40px')};
    left: ${(props) => (props.top ? '70px' : '80px')};
    bottom: ${(props) => (props.top ? '2rem' : '0.2rem')};
    background: linear-gradient(180deg, #ffdc2a 0%, #fb2182 41.54%);
    box-shadow: ${(props) =>
      props.top ? '0px 0px 72px 1rem' : '0px 0px 36px'} #ffdc2a;
    z-index: 2;
    border-radius: 65px;
    transition: all 1s ease-in-out;
  }
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: ${theme.size.xxxs};
    background: ${(props) =>
      `${theme.colors[props.color][500]}${theme.opacity[800]}`};
    box-shadow: 0px 0px 16px ${(props) => theme.colors[props.color][400]};
    border-radius: 2px;
    z-index: 3;
    border: 2px solid;
    transition: all 1s ease-in-out;
    border-image: linear-gradient(
        ${(props) => theme.colors[props.color][500]},
        ${(props) => theme.colors[props.color][400]}
      )
      30;
  }
`;
const StartButton = ({ title, color }) => {
  const top = title === 'Kích hoạt auto';

  const handleClick = () => {
    // dispatch(setAuto(...);
  };

  return (
    <StyledButton top={top} color={color} onClick={handleClick}>
      <div>
        <div className="button">
          <Box
            color="yellow"
            fontFamily="'Sacramento', cursive"
            fontWeight="700"
            transition="all 0.3s ease-in-out"
          >
            {title}
          </Box>
        </div>
        <div className="sun" />
      </div>
    </StyledButton>
  );
};
export default StartButton;
