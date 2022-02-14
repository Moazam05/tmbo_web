import React from 'react';
import TextField from '@mui/material/TextField';

const SignUpInfo = ({ formData, setFormData }) => {
  return (
    <React.Fragment>
      <TextField
        id='outlined-basic'
        label='Email'
        variant='outlined'
        value={formData.email}
        onChange={(event) =>
          setFormData({ ...setFormData, email: event.target.value })
        }
      />
      <div className='my-3'>
        <TextField
          id='outlined-basic'
          label='Password'
          variant='outlined'
          value={formData.password}
          onChange={(event) =>
            setFormData({ ...formData, password: event.target.value })
          }
        />
      </div>
      <div className='mb-3'>
        <TextField
          id='outlined-basic'
          label='Confirm Password'
          variant='outlined'
          value={formData.password}
          onChange={(event) =>
            setFormData({ ...formData, confirmPassword: event.target.value })
          }
        />
      </div>
    </React.Fragment>
  );
};

export default SignUpInfo;
