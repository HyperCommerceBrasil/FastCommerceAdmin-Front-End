import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px;

  table {
    width: 100%;
    border-collapse: collapse;
    thead {
      background: white;
      margin: 8px;

      margin-bottom: 8px;

      tr {
        th {
          height: 30px;
          text-align: left;
          color: #595959;
          font-weight: bold;
          border-bottom: 2px #595959 solid;

          text-align: left;
        }
      }
    }

    tbody {
      tr {
        cursor: pointer;
        transition: 0.7s;
        &:hover {
          background: #e4e4e4;
          opacity: 1;
        }
        td {
          text-align: left;
          height: 66px;
        }
      }
    }
  }
`;
