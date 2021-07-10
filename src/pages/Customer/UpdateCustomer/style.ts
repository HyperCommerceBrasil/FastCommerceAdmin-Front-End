import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
  width: 100%;
  background: white;
  overflow: hidden;

  div {
    width: 100%;
  }

  header {
    display: flex;
    flex-direction: row;
  }
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  flex-direction: column;
`;

export const SectionAddress = styled.div`
  margin-top: 48px;
  margin-bottom: 48px;
`;

export const ListAddresses = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  & > div {
    margin-left: 24px;
  }

  > div {
    button {
      margin-top: 16px;
    }
    button + button {
      margin-left: 8px;
    }
  }
`;
