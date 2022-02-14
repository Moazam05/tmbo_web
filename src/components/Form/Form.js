import React, { useState } from 'react';
import Other from './Other';
import PersonalInfo from './PersonalInfo';
import SignUpInfo from './SignUpInfo';
import BorderLinearProgress from '../AddNewBoats/BorderLinearProgress';

const Form = () => {
  const [page, setPage] = useState(0);

  const FormTitles = ['Sign Up', 'Personal Info', 'Other'];

  const [formData, setFormData] = useState({
    email: 'email',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    username: '',
    nationality: '',
    other: '',
  });

  const PageDisplay = () => {
    if (page === 0) {
      return <SignUpInfo formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <PersonalInfo />;
    } else {
      return <Other />;
    }
  };

  return (
    <React.Fragment>
      <h1>{FormTitles[page]}</h1>
      <BorderLinearProgress value={page === 0 ? 33 : page == 1 ? 66 : 100} />

      <div className='form-body'>{PageDisplay()}</div>
      <button
        disabled={page === 0}
        onClick={() => {
          setPage((currentPage) => currentPage - 1);
        }}
      >
        Prev
      </button>
      <button
        // disabled={page === FormTitles.length - 1}
        onClick={() => {
          if (page === FormTitles.length - 1) {
            alert('FORM SUBMITTED');
            console.log(formData);
          } else {
            setPage((currentPage) => currentPage + 1);
          }
        }}
      >
        {page === FormTitles.length - 1 ? 'Submit' : 'Next'}
      </button>
    </React.Fragment>
  );
};

export default Form;
