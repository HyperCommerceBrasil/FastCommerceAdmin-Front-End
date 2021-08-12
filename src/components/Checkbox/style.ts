import styled from 'styled-components';

interface ContentProps {
  error?: boolean;
}



export const Container = styled.div<ContentProps>`
  display: flex;
  flex-direction: row;
  background: transparent;
  width: 100%;
  margin: 8px;

  input {
    border-color: red;
  }

  label {
    margin-left: 8px;
    margin-bottom: 4px;
  }
`;
