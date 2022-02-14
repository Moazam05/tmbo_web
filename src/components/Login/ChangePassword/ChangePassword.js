import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import MaterialSnackbar from '../../MaterialSnackbar';

import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

import { changePasswordAction } from '../../../actions/changePasswordAction';

const ChangePassword = () => {
  const [message, setMessage] = useState('');

  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changePassword = useSelector((state) => state.changePassword);

  const {
    loading,
    error,
    changePasswordInfo,
    // , fstatus
  } = changePassword;

  useEffect(() => {
    setMessage(changePasswordInfo?.message);
  }, [changePassword]);

  // useEffect(() => {
  //   if (changePasswordInfo.message === 'Password Changed Successfully!') {
  //     navigate('/');
  //   }
  // }, [navigate, changePasswordInfo.message]);

  console.log('changePassword', changePassword);

  const handleClick = () => {
    setOpen(true);
  };
  return (
    <div
    // className='background-logo'
    >
      <div
      // className='sign-up-wrap'
      >
        {/* <Navbar buttonName='Log In' pageRoute='/login' /> */}

        {message && (
          <MaterialSnackbar
            handleClick={handleClick}
            open={open}
            setOpen={setOpen}
            message={message}
            severity={
              message === 'Password Changed Successfully!' ? 'success' : 'error'
            }
          />
        )}

        <div
        // className='center-card'
        >
          <div
          // className='inner-center-card sign-up'
          >
            <h3 className='login'>Create New Password</h3>
            <Formik
              initialValues={{
                oldPassword: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={Yup.object().shape({
                oldPassword: Yup.string()
                  .min(6, 'Password must be at least 6 characters')
                  .required('Old Password is required'),
                password: Yup.string()
                  .min(6, 'Password must be at least 6 characters')
                  .required('Password is required'),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref('password'), null], 'Passwords must match')
                  .required('Confirm Password is required'),
              })}
              onSubmit={(fields) => {
                // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 3));
                dispatch(
                  changePasswordAction(
                    fields.oldPassword,
                    fields.password,
                    fields.confirmPassword,
                    () => {
                      localStorage.removeItem('userInfo');
                      navigate('/login');
                    }
                  )
                );
              }}
              render={({ errors, status, touched, isValid, dirty }) => (
                <Form>
                  <div className='form-group'>
                    <label htmlFor='oldPassword'>Old Password</label>
                    <Field
                      name='oldPassword'
                      type='password'
                      className={
                        'form-control' +
                        (errors.oldPassword && touched.oldPassword
                          ? ' is-invalid'
                          : '')
                      }
                    />
                    <ErrorMessage
                      name='oldPassword'
                      component='div'
                      className='invalid-feedback'
                    />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <Field
                      name='password'
                      type='password'
                      className={
                        'form-control' +
                        (errors.password && touched.password
                          ? ' is-invalid'
                          : '')
                      }
                    />
                    <ErrorMessage
                      name='password'
                      component='div'
                      className='invalid-feedback'
                    />
                  </div>
                  <div className='form-group' style={{ marginBottom: '25px' }}>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <Field
                      name='confirmPassword'
                      type='password'
                      className={
                        'form-control' +
                        (errors.confirmPassword && touched.confirmPassword
                          ? ' is-invalid'
                          : '')
                      }
                    />
                    <ErrorMessage
                      name='confirmPassword'
                      component='div'
                      className='invalid-feedback'
                    />
                  </div>

                  <div className='form-group'>
                    <button
                      className={
                        !(isValid && dirty)
                          ? 'main-button disable'
                          : 'main-button enable'
                      }
                      type='submit'
                      onClick={handleClick}
                      disabled={!(isValid && dirty)}
                    >
                      Reset Password
                      {loading && (
                        <span
                          className='spinner-border spinner-border-sm'
                          role='status'
                          aria-hidden='true'
                          style={{ marginLeft: '12px' }}
                        ></span>
                      )}
                    </button>
                  </div>
                </Form>
              )}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ChangePassword;
