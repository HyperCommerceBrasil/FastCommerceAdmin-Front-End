import React, { useState, useCallback, useEffect } from 'react';
import { Pagination } from './style';

interface PaginateProps {
  nPages: number;
}

const Paginate: React.FC<PaginateProps> = ({ nPages }) => {
  const pages = useState<number[]>([]);

  const generatePagination = useCallback(() => {
    for (let i = 0; i < nPages; i++) {
      pages[0].push(i + 1);
    }
  }, [nPages, pages]);

  useEffect(() => {
    generatePagination();
  }, [nPages, pages, generatePagination]);

  return (
    <>
      <Pagination>
        {pages[0].map(page => {
          return (
            <li key={page}>
              <a href={`/customers/?page=${page}`}>{page}</a>
            </li>
          );
        })}
      </Pagination>
    </>
  );
};

export default Paginate;
