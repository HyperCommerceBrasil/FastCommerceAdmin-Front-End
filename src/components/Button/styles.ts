import styled from 'styled-components';

const handleColorType = (colorParsed: String | undefined) => {
  switch (colorParsed) {
    case 'primary':
      return '#03a9f3';
    case 'danger':
      return '#f56342';
    case 'secondary':
      return '#584B99';
    default:
      return '#1111111';
  }
};

interface ButtonProps {
  colorTheme?: string;
}

export const ButtonCustom = styled.button<ButtonProps>`
  height: 40px;
  text-align: center;
  background: ${({ colorTheme }) => handleColorType(colorTheme)};
  color: white;
  font-weight: 500;
  border-radius: 8px;
  border: transparent;
  padding: 10px;
  transition: ease-in-out 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;
