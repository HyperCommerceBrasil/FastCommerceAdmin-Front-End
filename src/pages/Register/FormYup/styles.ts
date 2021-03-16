import styled from 'styled-components'

export const Wrapper = styled.div`
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: center;
  

  input {
    width: 280px;
    padding: 5px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid;
    @media (max-width: 767px) {
      width: 200px;      
    }
    @media (max-width: 424px) {
      width: 160px;      
    }
  }

  button {
    width: 280px;
    height: 40px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-weight: bold;
    padding: 5px 0;
    margin: 50px 0 20px;
    background-color: #60B4DA;
    color: #FFFFFF;
    border: 0;
    border-radius: 2px;
    @media (max-width: 767px) {
      width: 200px;      
    }
    @media (max-width: 424px) {
      width: 160px;      
    }
    cursor: pointer;
    &:hover {
      background-color: #60a4cA;
      color: white;
      transition-duration: 0.5s;
    }
  }
`;