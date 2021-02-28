import styled from 'styled-components';

interface ModalOptions {
  show: boolean;
}

interface ModalContent {
  widthModal?: string;
}

export const ModalBody = styled.div<ModalOptions>`
  display: ${props => (props.show ? 'block' : 'none')}; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

export const ModalContent = styled.div<ModalContent>`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: ${props => (props.widthModal ? props.widthModal : '80%')};
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid silver;
  margin-bottom: 16px;

  svg {
    margin-left: auto;
    cursor: pointer;
  }
`;
