import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MaterialSnackbar from '../../MaterialSnackbar';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { forgotPasswordAction } from '../../../actions/forgotPasswordAction';
import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/Navbar';

const ForgotPassword = () => {
  const [message, setMessage] = useState('');

  const [open, setOpen] = React.useState(false);

  //   const navigate = useNavigate();
  const dispatch = useDispatch();

  const forgotPassword = useSelector((state) => state.forgotPassword);

  const { loading, error, forgotPasswordInfo } = forgotPassword;

  useEffect(() => {
    setMessage(forgotPasswordInfo?.message);
  }, [forgotPassword]);

  //   useEffect(() => {
  //     if (userInfo?.status === true) {
  //       navigate('/dashboard');
  //     }
  //   }, [navigate, userInfo?.status]);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <>
      <div className='background-logo'>
        <div className='login-wrap'>
          <Navbar buttonName='Log in' pageRoute='/' />
          {message && (
            <MaterialSnackbar
              handleClick={handleClick}
              open={open}
              setOpen={setOpen}
              message={message}
              severity={
                message === 'Reset Password link send to your email'
                  ? 'success'
                  : 'error'
              }
            />
          )}
          <div className='center-card'>
            <div className='inner-center-card'>
              <h3 className='login'>Forgot Password</h3>

              <Formik
                initialValues={{
                  email: '',
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),
                })}
                onSubmit={(fields) => {
                  //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 1))
                  dispatch(forgotPasswordAction(fields.email));
                }}
              >
                {({ errors, status, touched, isValid, dirty }) => (
                  <Form>
                    <div className='form-row'></div>
                    <div className='form-group space'>
                      <label htmlFor='email' className='label-space'>
                        Email
                      </label>
                      <Field
                        name='email'
                        type='text'
                        placeholder='tmbo@gmail.com'
                        className={
                          'form-control' +
                          (errors.email && touched.email ? ' is-invalid' : '')
                        }
                      />
                      <ErrorMessage
                        name='email'
                        component='div'
                        className='invalid-feedback'
                      />
                    </div>

                    <div
                      className='form-group'
                      style={{ marginBottom: '25px' }}
                    >
                      <button
                        className={
                          !(isValid && dirty)
                            ? 'main-button disable'
                            : 'main-button'
                        }
                        type='submit'
                        onClick={handleClick}
                        disabled={!(isValid && dirty)}
                      >
                        Send Email
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
              </Formik>
            </div>

            <Link to='/signup' className='dont-accout'>
              Don't have an account? <span> Register Now</span>
            </Link>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
