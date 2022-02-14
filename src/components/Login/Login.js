import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MaterialSnackbar from '../MaterialSnackbar';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Login.scss';

import { login } from '../../actions/userAction';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const Login = () => {
  const [message, setMessage] = useState('');

  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    setMessage(userInfo?.message);
  }, [userLogin]);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <>
      <div className='background-logo'>
        <div className='login-wrap'>
          <Navbar buttonName='Sign Up' pageRoute='/signup' />
          {message && (
            <MaterialSnackbar
              handleClick={handleClick}
              open={open}
              setOpen={setOpen}
              message={message}
              severity={
                message === 'Logged In Successfully!' ? 'success' : 'error'
              }
            />
          )}
          <ToastContainer />
          <div className='center-card'>
            <div className='inner-center-card'>
              <h3 className='login'>Login</h3>

              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email('Email is invalid')
                    .required('Email is required'),
                  password: Yup.string()
                    .min(6, 'Password must be at least 6 characters')
                    .required('Password is required'),
                })}
                // onSubmit={submitHandler}
                onSubmit={async (fields) => {
                  // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 2))
                  await dispatch(
                    login(fields.email, fields.password, () => {
                      navigate('/dashboard');
                    })
                  );
                }}
              >
                {({ errors, status, touched }) => (
                  <Form>
                    <div className='form-row'></div>
                    <div className='form-group space'>
                      <label htmlFor='email' className='label-space'>
                        Email
                      </label>
                      <Field
                        name='email'
                        type='text'
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
                    <div className='form-row'>
                      <div className='form-group'>
                        <label htmlFor='password' className='label-space'>
                          Password
                        </label>
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
                      <Link
                        to='/forgotpassword'
                        className='form-group space forgot'
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    <div
                      className='form-group'
                      style={{ marginBottom: '25px' }}
                    >
                      <button
                        type='submit'
                        onClick={handleClick}
                        className='main-button'
                      >
                        Log In
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

export default Login;
