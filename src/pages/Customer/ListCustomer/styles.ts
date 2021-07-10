import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
  width: 100%;

  header {
    display: flex;
    flex-direction: row;
  }
`;

export const Content = styled.div`
  display: flex;
  width: 100%;

  table {
    font-weight: 400;
    min-width: 420px;
    width: 100%;

    thead {
      display: none;
      font-weight: 500;
      background: white;
    }

    tbody {
      tr {
        border: 1px solid #dad6eb;
        border-radius: 5px;
        display: block;
        padding: 30px;
        margin-bottom: 30px;

        td {
          display: block;
          font-weight: 500;
          padding: 5px;
          position: relative;
          text-align: right;

          button {
            background: #927cfe;
            border: none;
            border-radius: 20px;
            box-shadow: 0 4px 8px transparentize(#222, 0.8);
            color: #fff;
            font-weight: 700;
            padding: 10px 0;
            width: 50%;
            transition: 1s;

            &:hover {
              background: lighten(#927cfe, 5%);
              cursor: pointer;
              opacity: 0.8;
            }
          }
        }
      }
    }
  }

  @media all and (min-width: 768px) {
    table {
      border: 1px solid #eee;
      border-collapse: collapse;
      text-align: left;
      width: 100%;

      thead {
        display: table-header-group;

        th {
          padding: 10px;
        }
      }

      tbody {
        font-size: 0.875em;

        tr {
          border: none;
          display: table-row;
          background: white;
          border: 3px transparent solid;

          &:nth-child(odd) {
            background: #eee;
          }

          transition: ease-in-out 0.6s;
          &:hover {
            opacity: 0.8;
            border: 3px #169ddd solid;
            margin: 1px;
            cursor: pointer;
          }

          td {
            display: table-cell;
            font-weight: 400;
            padding: 10px;
            text-align: left;
            align-items: left;

            button {
              display: inline-block;
              padding: 10px 15px;
              position: initial;
              transform: translate(0);
              width: auto;
              margin: 0;
            }

            &:before {
              display: none;
            }

            &:last-child {
              text-align: left;
              margin-right: auto;
              margin-left: 0;
            }
          }
        }
      }
    }
  }
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 32px;
`;

export const ButtonsHeader = styled.div`
  margin-left: auto;
  margin-right: 50px;
`;
