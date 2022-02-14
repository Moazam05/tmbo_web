import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import MuiPhoneNumber from 'material-ui-phone-number';
import { useDispatch, useSelector } from 'react-redux';
import MaterialSnackbar from '../../MaterialSnackbar';
import './SignUp.scss';

import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';

import { signUp } from '../../../actions/signUpAction';

const SignUp = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const [open, setOpen] = React.useState(false);

  const userSignUp = useSelector((state) => state.userSignUp);

  const { loading, error, signUpInfo } = userSignUp;

  const [roleId, setRoleId] = useState(2);

  useEffect(() => {
    setMessage(signUpInfo?.message);
  }, [userSignUp]);

  console.log('userSignUp', userSignUp);

  const handleClick = () => {
    setOpen(true);
  };
  return (
    <div className='background-logo'>
      <div className='sign-up-wrap'>
        <Navbar buttonName='Log In' pageRoute='/' />

        {message && (
          <MaterialSnackbar
            handleClick={handleClick}
            open={open}
            setOpen={setOpen}
            message={message}
            severity={
              message === 'Check your email and click on the link to verify'
                ? 'success'
                : 'error'
            }
          />
        )}

        <div className='center-card'>
          <div className='inner-center-card sign-up'>
            <h3 className='login'>Sign Up</h3>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={Yup.object().shape({
                firstName: Yup.string().required('First Name is required'),
                lastName: Yup.string().required('Last Name is required'),
                email: Yup.string()
                  .email('Email is invalid')
                  .required('Email is required'),
                phoneNumber: Yup.string('Enter a valid Phone Number')
                  .required('Phone number required')
                  .length(17, 'Phone number is not valid'),
                password: Yup.string()
                  .min(6, 'Password must be at least 6 characters')
                  .required('Password is required'),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref('password'), null], 'Passwords must match')
                  .required('Confirm Password is required'),
              })}
              onSubmit={(fields) => {
                // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 7));
                dispatch(
                  signUp(
                    fields.firstName,
                    fields.lastName,
                    fields.email,
                    fields.phoneNumber,
                    fields.password,
                    fields.confirmPassword,
                    roleId
                  )
                );
              }}
              render={({
                errors,
                status,
                touched,
                values,
                setFieldValue,
                handleBlur,
                isValid,
                dirty,
              }) => (
                <Form>
                  <div className='name-field'>
                    <div className='form-group'>
                      <label htmlFor='firstName'>First Name</label>
                      <Field
                        name='firstName'
                        type='text'
                        className={
                          'form-control' +
                          (errors.firstName && touched.firstName
                            ? ' is-invalid'
                            : '')
                        }
                      />
                      <ErrorMessage
                        name='firstName'
                        component='div'
                        className='invalid-feedback'
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='lastName'>Last Name</label>
                      <Field
                        name='lastName'
                        type='text'
                        className={
                          'form-control' +
                          (errors.lastName && touched.lastName
                            ? ' is-invalid'
                            : '')
                        }
                      />
                      <ErrorMessage
                        name='lastName'
                        component='div'
                        className='invalid-feedback'
                      />
                    </div>
                  </div>
                  <div className='name-field'>
                    <div className='form-group'>
                      <label htmlFor='email'>Email</label>
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
                    <div className='form-group'>
                      <label htmlFor='email'>Phone</label>

                      <MuiPhoneNumber
                        defaultCountry={'us'}
                        className='anonymous'
                        name='phoneNumber'
                        value={values.phoneNumber}
                        onChange={(e) => setFieldValue('phoneNumber', e)}
                        onBlur={handleBlur('phoneNumber')}
                        error={
                          touched.phoneNumber && Boolean(errors.phoneNumber)
                        }
                        helperText={touched.phoneNumber && errors.phoneNumber}
                      />
                    </div>
                  </div>
                  <div className='name-field'>
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
                    <div
                      className='form-group'
                      style={{ marginBottom: '25px' }}
                    >
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
                  </div>
                  <div className='form-group'>
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
                      Register
                      {loading && (
                        <span
                          className='spinner-border spinner-border-sm'
                          role='status'
                          aria-hidden='true'
                          style={{ marginLeft: '12px' }}
                        ></span>
                      )}
                    </button>
                    {/* <button type='reset' className='btn btn-secondary'>
                        Reset
                      </button> */}
                  </div>
                </Form>
              )}
            />
          </div>
          <Link to='/' className='dont-accout'>
            Have an account? <span> Login</span>
          </Link>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SignUp;
