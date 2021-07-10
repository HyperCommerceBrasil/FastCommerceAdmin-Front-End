import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { createContext } from 'react';
import { Backdrop } from '@material-ui/core';

interface LoadProps {
  show: boolean;
}

const LinearLoader: React.FC<LoadProps> = ({ show }) => {
  return (
    <>
      <Backdrop
        open={show}
        style={{
          position: 'absolute',
          zIndex: 0,
          display: 'flex',
          flexDirection: 'column',
          color: 'white',
        }}
      >
        <CircularProgress
          style={{
            display: show ? 'block' : 'none',
            width: '300px',
            height: '300px',
          }}
          color="primary"
        />
        <span>Processando ...</span>
      </Backdrop>
    </>
  );
};

export default LinearLoader;
