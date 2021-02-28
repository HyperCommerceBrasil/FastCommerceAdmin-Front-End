import React, { HTMLAttributes } from 'react';
import { FaDollarSign } from 'react-icons/fa';
import { IconType } from 'react-icons';

import { CardContainer, ContentCard, Title, Subtitle } from './styles';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  color?: string;
  Icon?: IconType;
  title?: string;
  subtitle?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  color,
  Icon,
  title,
  subtitle,
}) => {
  return (
    <CardContainer color={color}>
      {Icon && <Icon size={32} color="white" />}
      {!Icon && <FaDollarSign color="white" size={32} />}

      <ContentCard>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>

        {children}
      </ContentCard>
    </CardContainer>
  );
};

export default Card;
