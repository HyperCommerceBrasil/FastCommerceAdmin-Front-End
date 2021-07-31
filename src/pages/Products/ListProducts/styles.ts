import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  header {
    button {
      margin-left: auto;
      margin-right: 50px;
      width: 200px;
      height: 50px;
      color: white;
      background: #60b4da;
      border-radius: 8px;
    }
  }
`;

export const SearchingSection = styled.fieldset`
  display: flex;
  flex-direction: row;
  height: 100px;
  background: #ffffff;
  border: silver 1px solid;
  padding: 10px;
  border-radius: 8px;
  margin: 30px;
`;

export const FormContainer = styled.div`
  display: flex;
  width: 100%;

  form {
    display: flex;
    flex-direction: row;
  }

  button {
    margin: 0 auto;
    margin: 12px;
    width: 100px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
`;

export const CardCustom = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  margin: 10px;

  height: 320px;
  width: 250px;
  padding: 25px;
  box-shadow: 1px 5px 5px rgba(187, 187, 187, 0.25);
  border-radius: 7px;

  img {
    width: 200px;
    height: 200px;
  }
`;

export const CardFooter = styled.div`
  button {
    background: white;
    box-shadow: 1px 5px 5px rgba(187, 187, 187, 0.25);
    border-radius: 50%;
    padding: 5px;
    border: 1px solid #e2e2e2;
    transition: 0.2s ease-in-out;
    &:hover {
      opacity: 0.5;
      svg {
        color: white;
      }

      background: #60b4da;
    }

    svg {
      color: silver;
    }
    & + button {
      margin-left: 5px;
    }
  }
`;
