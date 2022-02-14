import React from 'react';
import TextField from '@mui/material/TextField';

const PersonalInfo = () => {
  return (
    <React.Fragment>
      <TextField id='outlined-basic' label='First Name' variant='outlined' />
      <div className='my-3'>
        <TextField id='outlined-basic' label='Last Name' variant='outlined' />
      </div>
      <div className='mb-3'>
        <TextField id='outlined-basic' label='Middle Name' variant='outlined' />
      </div>
    </React.Fragment>
  );
};

export default PersonalInfo;
