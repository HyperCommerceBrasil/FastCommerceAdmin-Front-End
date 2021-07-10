import React from 'react';
import { LinearProgress } from '@material-ui/core';
import { createContext } from 'react';

interface LoadProps {
  show: boolean;
}

const LinearLoader: React.FC<LoadProps> = ({ show }) => {
  return (
    <>
      <LinearProgress
        style={{ visibility: show ? 'visible' : 'hidden', width: '100%' }}
        color="primary"
      />
    </>
  );
};

export default LinearLoader;
