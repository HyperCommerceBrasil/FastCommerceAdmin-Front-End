import styled from 'styled-components';

interface ContentProps {
  error?: boolean;
}

export const MessageError = styled.div`
  width: 300px;
  margin-left: auto;
  color: #f326;
`;
export const ContentInput = styled.div<ContentProps>`
  height: 50px;
  width: 100%;

  display: flex;
  flex-direction: row;
  border: 1px silver solid;
  border-color: ${props => (props.error ? 'red' : 'silver')};
  border-radius: 5px;
  padding: 15px;

  input {
    border: transparent;
    width: 100%;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin: 4px 2px;
  }
`;
