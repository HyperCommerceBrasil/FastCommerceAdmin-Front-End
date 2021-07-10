import React, { useState, useCallback, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Pagination } from './style';

interface PaginateProps {
  nPages: number;
}

const Paginate: React.FC<PaginateProps> = ({ nPages }) => {
  const [pages, setPages] = useState<number[]>([]);

  const generatePagination = useCallback(() => {
    for (let i = 0; i < nPages; i++) {
      pages.push(i + 1);
    }
  }, [nPages]);

  useEffect(() => {
    generatePagination();
    console.log(pages);
  }, [nPages, pages]);

  const history = useHistory();

  return (
    <>
      <Pagination>
        <li>
          <a href="#">«</a>
        </li>
        {pages.map(page => {
          return (
            <li key={page}>
              <a href={`/customers/?page=${page}`}>{page}</a>
            </li>
          );
        })}
        <li>
          <a href="#">»</a>
        </li>
      </Pagination>
    </>
  );
};

export default Paginate;
