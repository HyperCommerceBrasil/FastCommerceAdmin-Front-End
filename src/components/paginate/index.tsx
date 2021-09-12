// import { Link } from 'react-router-dom';
import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from './style';

interface PaginateProps {
  nPages: number;
  route: string;
}

const Paginate: React.FC<PaginateProps> = ({ nPages, route }) => {
  const pages = useState<number[]>([]);

  const generatePagination = useCallback(() => {
    for (let i = 0; i < nPages; i++) {
      pages[0].push(i + 1);
    }
  }, [nPages, pages]);

  useEffect(() => {
    generatePagination();
  }, [pages]);

  return (
    <>
      <Pagination>
        {pages[0].map(page => {
          return (
            <li key={page}>
              <a href={`/${route}/?page=${page}`}>{page}</a>
            </li>
          );
        })}
      </Pagination>
    </>
  );
};

export default Paginate;
