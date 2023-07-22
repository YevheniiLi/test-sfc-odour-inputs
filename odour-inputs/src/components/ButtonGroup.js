import React from 'react';
import { StyledButton } from '../globalStyles.styled';

const ButtonGroup = ({ buttonTitles, buttonsPressed, handleButtonClick }) => {
  return (
    <div>
      <h2>Tipo de olor</h2>
      {buttonTitles.map((title, index) => (
        <StyledButton
          key={index}
          pressed={buttonsPressed[index] | ""}
          onClick={() => handleButtonClick(index)}
        >
          {title}
        </StyledButton>
      ))}
    </div>
  );
};

export default ButtonGroup;
