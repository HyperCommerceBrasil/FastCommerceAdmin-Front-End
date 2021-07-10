import React, { HTMLAttributes } from 'react';
import { FaDollarSign } from 'react-icons/fa';
import { IconType } from 'react-icons';

import { CardContainer, ContentCard, Title, Subtitle } from './styles';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  color?: string;
  Icon?: IconType;
  title?: string;
  subtitle?: string;
  iconColor?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  color,
  Icon,
  title,
  subtitle,
  iconColor,
  ...rest
}) => {
  return (
    <CardContainer color={color} {...rest}>
      {Icon && <Icon size={32} color={iconColor || 'black'} />}

      <ContentCard>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>

        {children}
      </ContentCard>
    </CardContainer>
  );
};

export default Card;
