import React from 'react';
import { FaWindowClose } from 'react-icons/fa';

import { ModalBody, ModalContent, ModalHeader } from './styles';

interface ModalOptions {
  show: boolean;
  title?: string;
  widthPercent?: string;
  closeModal?: any;
}

const ModalCustom: React.FC<ModalOptions> = ({
  children,
  show,
  title,
  widthPercent,
  closeModal,
}) => {
  return (
    <ModalBody show={show}>
      <ModalContent widthModal={widthPercent}>
        <ModalHeader>
          <h1>{title}</h1>

          <FaWindowClose
            onClick={() => {
              closeModal(!show);
            }}
          />
        </ModalHeader>

        {children}
      </ModalContent>
    </ModalBody>
  );
};

export default ModalCustom;
