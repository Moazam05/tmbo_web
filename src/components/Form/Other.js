import React from 'react';
import TextField from '@mui/material/TextField';

const Other = () => {
  return (
    <React.Fragment>
      <TextField id='outlined-basic' label='Nationality' variant='outlined' />
      <div className='my-3'>
        <TextField id='outlined-basic' label='Otherw' variant='outlined' />
      </div>
    </React.Fragment>
  );
};

export default Other;
