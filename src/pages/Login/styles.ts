import styled from 'styled-components';


export const Wrapper = styled.div`
  background-color: #ffffff;
  display: flex;
`;

export const ColumnLeft = styled.div`
  height: 100vh;
  width: 47.91%;
  align-items: center;


  background-color: #60B4DA;

  -webkit-box-shadow: 4px 4px 10px -3px rgba(0,0,0,0.75);
  -moz-box-shadow: 4px 4px 10px -3px rgba(0,0,0,0.75);
  box-shadow: 4px 4px 10px -3px rgba(0,0,0,0.75);

  display: flex;
`;

export const ContentLeft = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  text-align: center;
  > img {
    width: 100%;
    max-width: 250px;
  }
  > p {
    @media (max-width: 767px) {
      font-size: 1.2rem;
    }
    padding: 5% 20%;
    font-size: 1.5rem;
    color: white;
    width: 100%;
    height: 100%;
  }
`;

export const BallOne = styled.div`
  width: 33.68%;
  height: 34.95%;
  clip-path: circle(40% at 0 100%);
  background: #D2E5EB;
  position: absolute;
  bottom: 0;


`;
export const BallTwo = styled.div`
  width: 33.68%;
  height: 34.95%;
  clip-path: circle(50% at 0 100%);
  position: absolute;
  bottom: 0;

background: rgba(97, 133, 143, 0.33);

`;

export const ColumnRight = styled.div`
  height: 100vh;
  width: 52.09%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContentRight = styled.div`
  text-align: center;

  p{
    font-weight: 700;
    font-size: 32px;
    margin-bottom: 20px;
    @media (max-width: 991px) {
      font-size: 26px;
    }
  }

`;
