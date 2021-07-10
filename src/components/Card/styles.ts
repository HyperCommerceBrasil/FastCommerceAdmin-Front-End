import styled from 'styled-components';

interface CardProps {
  color?: string;
}

export const CardContainer = styled.div<CardProps>`
  width: 100%;
  background: ${props => (props.color ? props.color : 'silver')};
  border: 1px solid silver;
  height: auto;
  border-radius: 20px;
  padding: 10px;
  color: ${props => (props.color === '#fff' || 'white' ? 'black' : 'white')};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  svg {
    margin: auto 0;
    margin-left: 32px;
  }
`;

export const ContentCard = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 32px;
  width: 100%;
  padding: 15px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
  font-weight: 700;
  margin-bottom: 16px;
`;

export const Subtitle = styled.p`
  strong {
    font-weight: bold;
  }
`;
