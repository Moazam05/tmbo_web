import React from 'react';
import './CenterPageLoader.css';
const Loader = () => {
  return (
    <>
      <div className='main-loader-wraper'>
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Loader;
