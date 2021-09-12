import styled from 'styled-components';

interface labelProps {
  colorTheme?: 'danger' | 'success' | 'warning';
}

const handleColorType = (colorParsed: String | undefined) => {
  switch (colorParsed) {
    case 'danger':
      return '#c6090961';
    case 'success':
      return '#0de80a75';
    case 'warning':
      return '#f5ce0f75';
    default:
      return '#1111111';
  }
};

export const Container = styled.div<labelProps>`
  width: auto;
  label {
    background: ${props => handleColorType(props.colorTheme)};
    height: 24px;
    width: 150px;
    color: ${props => handleColorType(props.colorTheme).substring(0, 6)};
    height: 24px;
    font-size: 16px;
    text-align: center;

    padding: 8px;
    border-radius: 8px;
    width: 300px;
  }
`;
