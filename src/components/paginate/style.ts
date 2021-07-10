import styled from 'styled-components';

export const Pagination = styled.ul`
  display: inline-block;
  padding: 0;
  margin: 0;

  li {
    display: inline;
  }

  li a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
  }

  li a.active {
    background-color: #4caf50;
    color: white;
  }

  li a:hover:not(.active) {
    background-color: #ddd;
  }
`;
