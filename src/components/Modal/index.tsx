import React from 'react';

import { ModalBody, ModalContent, ModalHeader } from './styles';

interface ModalOptions {
  show: boolean;
  title?: string;
  widthPercent?: string;
}

const ModalCustom: React.FC<ModalOptions> = ({
  children,
  show,
  title,
  widthPercent,
}) => {
  return (
    <ModalBody show={show}>
      <ModalContent widthModal={widthPercent}>
        <ModalHeader>
          <h1>{title}</h1>
        </ModalHeader>

        {children}
      </ModalContent>
    </ModalBody>
  );
};

export default ModalCustom;
