import styled from 'styled-components';

interface ContentProps {
  error?: boolean;
}



export const Container = styled.div<ContentProps>`
  display: flex;
  flex-direction: row;
  background: transparent;
 
  margin: 8px;

  input {
    border-color: red;
  }

  label {
    margin-left: 8px;
    margin-bottom: 4px;
  }
`;
