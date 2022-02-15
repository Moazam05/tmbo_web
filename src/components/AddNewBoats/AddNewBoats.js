import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './AddNewBoats.scss';

import SidebarBoats from '../Sidebar/SidebarBoats';
import MapContainer from '../GoogleMap/GoogleMap';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import { RadioButton, RadioButtonGroup } from './RadioInput';
import UploadImage from '../../images/uploadImage.png';

import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const AddNewBoats = (props) => {
  const userDropDownInfo = JSON.parse(localStorage.getItem('dropDownInfo'));
  // console.log('dropDownReducer', userDropDownInfo);

  const {
    data: { features },
  } = userDropDownInfo;
  const {
    data: { things },
  } = userDropDownInfo;

  const [dropDownFeatures, setDropDownFeatures] = useState(features);

  const [boatThings, setBoatThings] = useState(things);
  // console.log('features', dropDownFeatures);
  // console.log('things', boatThings);

  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({
    // location: {
    //   address: '',
    //   mapCenter: {
    //     lat: 31.5331,
    //     lng: 74.3162,
    //   },
    // },
    // location: {
    //   value: 'UK',
    //   address: 'USA',
    //   cordinates: {
    //     lat: 31.5331,
    //     lng: 74.3162,
    //   },
    // },
    // location: {
    //   ...this.props.location,
    // },
    year: '',
    make: '',
    model: '',
    length: '',
    capacity: '',
    boatType: '',
    engineYear: '',
    engineType: '',
    noOfEngines: '',
    totalHorsePower: '',
    hullMaterial: '',
    listingTitle: '',
    description: '',
    insuranceCompany: '',
    insurancePolicy: '',
    boatRegistrationIdentification: '',
    lienRadioGroup: '',
    lienHolderName: '',
    statementCheck: '',
    cancellationPolicy: '',
    profile: [],
    boatPricing: '',
    fuelPays: '',
  });

  const makeRequest = (formData) => {
    console.log('Form Submitted', formData);
  };
  const hanleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) {
      makeRequest(newData);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const hanlePrevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <StepZero next={hanleNextStep} data={data} />,
    <StepOne next={hanleNextStep} prev={hanlePrevStep} data={data} />,
    <StepTwo next={hanleNextStep} prev={hanlePrevStep} data={data} />,
    <StepThree next={hanleNextStep} prev={hanlePrevStep} data={data} />,
    <StepFour next={hanleNextStep} prev={hanlePrevStep} data={data} />,
    <StepFive next={hanleNextStep} prev={hanlePrevStep} data={data} />,
    <StepSix next={hanleNextStep} prev={hanlePrevStep} data={data} />,
    <StepSeven next={hanleNextStep} prev={hanlePrevStep} data={data} />,
  ];

  console.log('data', data);
  console.log('data.location', data.location);
  return (
    <>
      <SidebarBoats newBoat={true}>
        <div className='add-new-boats-wrapper'>
          <div className='add-new'>Add Boat Deatils</div>
          <div className='boat-card'>
            <div className='tell-about'>Tell us about your boat</div>
            {steps[currentStep]}
          </div>
        </div>
      </SidebarBoats>
    </>
  );
};

export default AddNewBoats;

const StepZero = (props) => {
  const handleSubmit = (values) => {
    props.next(values);
  };

  const [address, setAddress] = useState('');
  const [mapCenter, setMapCenter] = useState({
    lat: 31.5331,
    lng: 74.3162,
  });

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = async (address) => {
    setAddress(address);
    // console.log(address);
    await geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log('Success', latLng);

        // update center state
        setMapCenter(latLng);
      })
      .catch((error) => console.error('Error', error));
  };

  console.log('final', address, mapCenter);
  return (
    <Formik
      initialValues={props.data}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({})}

      // initialValues={{ ...this.props.location }}
      // onSubmit={(fields) => {
      //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
      // }}
    >
      {({
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
          {/* 0th row */}
          <div style={{ marginTop: '20px' }}>
            <div className='row'>
              <div className='col-sm-12'>
                <div className='location-boat'>Add Boat Location</div>
                <MapContainer
                  handleChange={handleChange}
                  handleSelect={handleSelect}
                  address={address}
                  mapCenter={mapCenter}
                />

                {/* <Field name='location' component={MapContainer} /> */}

                {/* <ErrorMessage name='location.value' />
                <ErrorMessage name='location.address' /> */}
              </div>
            </div>
          </div>

          <div className='form-group mt-3 next-prev map'>
            <button type='submit' className='btn btn-primary next'>
              Continue
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const StepOne = (props) => {
  const handleSubmit = (values) => {
    props.next(values);
  };
  return (
    <React.Fragment>
      <div className='boat-detail'>Boat Details</div>

      <Formik
        initialValues={props.data}
        onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          year: Yup.string().required('Year required'),
          make: Yup.string().required('Make required'),
          model: Yup.string().required('Model required'),
          length: Yup.string().required('Length required'),
          capacity: Yup.number()
            .min(2, 'Too Short!')
            .max(300, 'Too Long! max number is 300')
            .required('Capacity required'),

          boatType: Yup.string().required('BoatType required'),
          engineYear: Yup.number()
            .min(2, 'Too Short!')
            .max(2022, 'Too Long! max number is 2022')
            .required('Engine Year required'),
          engineType: Yup.string().required('Engine Type required'),
          noOfEngines: Yup.number()
            .min(2, 'Too Short!')
            .max(12, 'Too Long! max number is 10')
            .required('No of engines required'),
          totalHorsePower: Yup.string().required('Total Horse Power required'),
          hullMaterial: Yup.string().required('Hull Material required'),
          listingTitle: Yup.string().required('Listing Title required'),
          description: Yup.string().required('Description required'),
        })}
        // onSubmit={(fields) => {
        //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
        // }}
        // onSubmit={async (fields) => {
        //   await new Promise((r) => setTimeout(r, 300));
        //   alert(JSON.stringify(fields, null, 2));
        // }}
      >
        {({
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
            {/* 1st row */}
            <div className='form-row both'>
              <div className='form-group col-6'>
                <label htmlFor='year'>Year</label>
                <Field
                  name='year'
                  as='select'
                  className={
                    'form-control' +
                    (errors.year && touched.year ? ' is-invalid' : '')
                  }
                >
                  <option value=''></option>
                  <option value='2022'>2022</option>
                  <option value='2021'>2021</option>
                  <option value='2020'>2020</option>
                  <option value='2019'>2019</option>
                  <option value='2018'>2018</option>
                  <option value='2017'>2017</option>
                  <option value='2016'>2016</option>
                  <option value='2015'>2015</option>
                  <option value='2014'>2014</option>
                  <option value='2013'>2013</option>
                  <option value='2012'>2012</option>
                  <option value='2011'>2011</option>
                  <option value='2010'>2010</option>
                  <option value='2009'>2009</option>
                  <option value='2008'>2008</option>
                  <option value='2007'>2007</option>
                  <option value='2006'>2006</option>
                  <option value='2005'>2005</option>
                  <option value='2004'>2004</option>
                  <option value='2003'>2003</option>
                  <option value='2002'>2002</option>
                  <option value='2001'>2001</option>
                  <option value='2000'>2000</option>
                </Field>

                <ErrorMessage
                  name='year'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
              <div className='form-group col-6'>
                <label htmlFor='make'>Make</label>
                <Field
                  name='make'
                  type='text'
                  className={
                    'form-control' +
                    (errors.make && touched.make ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage
                  name='make'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
            </div>
            {/* 2nd row */}
            <div className='form-row both'>
              <div className='form-group col-6'>
                <label htmlFor='model'>Modal</label>
                <Field
                  name='model'
                  type='text'
                  className={
                    'form-control' +
                    (errors.model && touched.model ? ' is-invalid' : '')
                  }
                />

                <ErrorMessage
                  name='model'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
              <div className='form-group col-6'>
                <label htmlFor='length'>Length</label>
                <Field
                  name='length'
                  type='text'
                  className={
                    'form-control' +
                    (errors.length && touched.length ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage
                  name='length'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
            </div>
            {/* 3rd row */}
            <div className='form-row both'>
              <div className='form-group col-6'>
                <label htmlFor='capacity'>Capacity</label>
                <Field
                  name='capacity'
                  type='text'
                  className={
                    'form-control' +
                    (errors.capacity && touched.capacity ? ' is-invalid' : '')
                  }
                />

                <ErrorMessage
                  name='capacity'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
              <div className='form-group col-6'>
                <label htmlFor='boatType'>Boat Type</label>
                <Field
                  name='boatType'
                  type='text'
                  className={
                    'form-control' +
                    (errors.boatType && touched.boatType ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage
                  name='boatType'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
            </div>
            {/* 4th row */}
            <div className='form-row both'>
              <div className='form-group col-6'>
                <label htmlFor='engineYear'>Engine Year</label>
                <Field
                  name='engineYear'
                  type='text'
                  className={
                    'form-control' +
                    (errors.engineYear && touched.engineYear
                      ? ' is-invalid'
                      : '')
                  }
                />

                <ErrorMessage
                  name='engineYear'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
              <div className='form-group col-6'>
                <label htmlFor='engineType'>Engine Type</label>
                <Field
                  name='engineType'
                  type='text'
                  className={
                    'form-control' +
                    (errors.engineType && touched.engineType
                      ? ' is-invalid'
                      : '')
                  }
                />
                <ErrorMessage
                  name='engineType'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
            </div>
            {/* 5th row */}
            <div className='form-row both'>
              <div className='form-group col-6'>
                <label htmlFor='noOfEngines'>No of Engines</label>
                <Field
                  name='noOfEngines'
                  type='text'
                  className={
                    'form-control' +
                    (errors.noOfEngines && touched.noOfEngines
                      ? ' is-invalid'
                      : '')
                  }
                />

                <ErrorMessage
                  name='noOfEngines'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
              <div className='form-group col-6'>
                <label htmlFor='totalHorsePower'>Total Horse Power</label>
                <Field
                  name='totalHorsePower'
                  type='text'
                  className={
                    'form-control' +
                    (errors.totalHorsePower && touched.totalHorsePower
                      ? ' is-invalid'
                      : '')
                  }
                />
                <ErrorMessage
                  name='totalHorsePower'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
            </div>
            {/* 6th row */}
            <div className='form-row both'>
              <div className='form-group col-6'>
                <label htmlFor='hullMaterial'>Hull Material</label>
                <Field
                  name='hullMaterial'
                  type='text'
                  className={
                    'form-control' +
                    (errors.hullMaterial && touched.hullMaterial
                      ? ' is-invalid'
                      : '')
                  }
                />

                <ErrorMessage
                  name='hullMaterial'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
              <div className='form-group col-6'>
                <label htmlFor='listingTitle'>Listing Title</label>
                <Field
                  name='listingTitle'
                  type='text'
                  className={
                    'form-control' +
                    (errors.listingTitle && touched.listingTitle
                      ? ' is-invalid'
                      : '')
                  }
                />
                <ErrorMessage
                  name='listingTitle'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
            </div>
            {/* 7th row */}
            <div className='form-row both'>
              <div className='form-group col-12'>
                <label htmlFor='description'>Description</label>
                <Field
                  name='description'
                  type='text'
                  as='textarea'
                  rows='4'
                  className={
                    'form-control' +
                    (errors.description && touched.description
                      ? ' is-invalid'
                      : '')
                  }
                />

                <ErrorMessage
                  name='description'
                  component='div'
                  className='invalid-feedback'
                />
              </div>
            </div>

            <div className='form-group mt-3 next-prev'>
              <button
                type='button'
                onClick={() => props.prev(values)}
                className='btn btn-primary back'
              >
                Back
              </button>
              <button type='submit' className='btn btn-primary next'>
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

const StepTwo = (props) => {
  const userDropDownInfo = JSON.parse(localStorage.getItem('dropDownInfo'));
  // console.log('dropDownReducer', userDropDownInfo);
  const {
    data: { features },
  } = userDropDownInfo;

  const [dropDownFeatures, setDropDownFeatures] = useState(features);
  const handleSubmit = (values) => {
    props.next(values);
  };
  return (
    <Formik
      // initialValues={{}}
      initialValues={props.data}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({})}
      // onSubmit={(fields) => {
      //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
      // }}
      // onSubmit={async (fields) => {
      //   await new Promise((r) => setTimeout(r, 300));
      //   alert(JSON.stringify(fields, null, 2));
      // }}
    >
      {({
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
          {/* 8th row */}
          <div style={{ marginTop: '20px' }}>
            <div className='row'>
              <div className='boat-detail'>Boat Features</div>
              {/* {dropDownFeatures.map((feature, index) => (
                        <div className='col-sm-3' key={feature.id}>
                          <div className='form-group form-check'>
                            <Field
                              type='checkbox'
                              name={feature.name}
                              className={
                                'form-check-input ' +
                                (errors.acceptTerms && touched.acceptTerms
                                  ? ' is-invalid'
                                  : '')
                              }
                            />
                            <label
                              htmlFor='acceptTerms'
                              className='form-check-label'
                            >
                              {feature.name}
                            </label>
                            <ErrorMessage
                              name='acceptTerms'
                              component='div'
                              className='invalid-feedback'
                            />
                          </div>
                        </div>
                      ))} */}
              {/* salman */}
              {dropDownFeatures.map((feature, index) => (
                <div className='col-sm-12 col-md-6 col-lg-3' key={feature.name}>
                  <div className='form-row'>
                    <div className='inputGroup'>
                      <input id={feature.name} name='option1' type='checkbox' />
                      <label htmlFor={feature.name}>{feature.name}</label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='form-group mt-3 next-prev'>
            <button
              type='button'
              onClick={() => props.prev(values)}
              className='btn btn-primary back'
            >
              Back
            </button>

            <button type='submit' className='btn btn-primary next'>
              Continue
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const StepThree = (props) => {
  const userDropDownInfo = JSON.parse(localStorage.getItem('dropDownInfo'));
  // console.log('dropDownReducer', userDropDownInfo);

  const {
    data: { things },
  } = userDropDownInfo;

  const [boatThings, setBoatThings] = useState(things);
  const handleSubmit = (values) => {
    props.next(values);
  };
  return (
    <Formik
      // initialValues={{}}
      initialValues={props.data}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({})}
      // onSubmit={(fields) => {
      //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
      // }}
      // onSubmit={async (fields) => {
      //   await new Promise((r) => setTimeout(r, 300));
      //   alert(JSON.stringify(fields, null, 2));
      // }}
    >
      {({
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
          {/* 9th row */}
          <div style={{ marginTop: '20px' }}>
            <div className='row'>
              <div className='boat-detail'>What's Allowed</div>

              {boatThings.map((things, index) => (
                <div className='col-sm-12 col-md-6 col-lg-3' key={things.name}>
                  <div className='form-row'>
                    <div className='inputGroup'>
                      <input id={things.name} name='option1' type='checkbox' />
                      <label htmlFor={things.name}>{things.name}</label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='form-group mt-3 next-prev'>
            <button
              type='button'
              onClick={() => props.prev(values)}
              className='btn btn-primary back'
            >
              Back
            </button>

            <button type='submit' className='btn btn-primary next'>
              Continue
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const StepFour = (props) => {
  const handleSubmit = (values) => {
    props.next(values);
  };
  return (
    <Formik
      // initialValues={{
      //   insuranceCompany: '',
      //   insurancePolicy: '',
      //   boatRegistrationIdentification: '',
      //   lienRadioGroup: '',
      //   lienHolderName: '',
      //   statementCheck: '',
      // }}
      initialValues={props.data}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        insuranceCompany: Yup.string().required('Insurance Company required'),
        insurancePolicy: Yup.string().required('Insurance Policy required'),
        boatRegistrationIdentification: Yup.string().required(
          'Boat Registration Identification required'
        ),
        lienRadioGroup: Yup.string().required('One option required'),
        lienHolderName: Yup.string().required('Lien HolderName required'),
        statementCheck: Yup.string().required('Statment required'),
      })}
      // onSubmit={(fields) => {
      //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
      // }}
      // onSubmit={async (fields) => {
      //   await new Promise((r) => setTimeout(r, 300));
      //   alert(JSON.stringify(fields, null, 2));
      // }}
    >
      {({
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
          {/* 10th row */}
          <div style={{ marginTop: '20px' }}>
            <div className='row'>
              <div className='boat-detail'>Add Boat Insurance</div>

              <div className='col-sm-12 col-md-6 col-lg-6'>
                <div className='form-row'>
                  <div className='inputGroup'>
                    <input id='option1' name='option11' type='radio' />
                    <label htmlFor='option1'>
                      I have recreational boat Insurance
                      <div className='boat-inusrance'>
                        Select this if you own a personal boat.
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className='col-sm-12 col-md-6 col-lg-6'>
                <div className='form-row'>
                  <div className='inputGroup'>
                    <input id='option2' name='option11' type='radio' />
                    <label htmlFor='option2'>
                      I have commercial character Insurance
                      <div className='boat-inusrance'>
                        Select this if you run a boat or character business.
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 11th row */}
          <div className='boat-detail'>Insurance's Detail</div>
          <div className='row'>
            <div className='col-sm-12 col-md-6 col-lg-6'>
              <div className='description-insuran'>
                Does your boat have liability coverge or existing recreational
                marine insurance?
              </div>
            </div>
          </div>
          {/* 12th row */}
          <div className='form-row both'>
            <div className='form-group col-6'>
              <label htmlFor='insuranceCompany'>Insurance Company</label>
              <Field
                name='insuranceCompany'
                type='text'
                className={
                  'form-control' +
                  (errors.insuranceCompany && touched.insuranceCompany
                    ? ' is-invalid'
                    : '')
                }
              />

              <ErrorMessage
                name='insuranceCompany'
                component='div'
                className='invalid-feedback'
              />
            </div>
            <div className='form-group col-6'>
              <label htmlFor='insurancePolicy'>Insurance Policy #</label>
              <Field
                name='insurancePolicy'
                type='text'
                className={
                  'form-control' +
                  (errors.insurancePolicy && touched.insurancePolicy
                    ? ' is-invalid'
                    : '')
                }
              />
              <ErrorMessage
                name='insurancePolicy'
                component='div'
                className='invalid-feedback'
              />
            </div>
          </div>
          {/* 13th row */}
          <div className='form-row both'>
            <div className='form-group col-6'>
              <label htmlFor='boatRegistrationIdentification'>
                Boat Registration Identificaion
              </label>
              <Field
                name='boatRegistrationIdentification'
                type='text'
                className={
                  'form-control' +
                  (errors.boatRegistrationIdentification &&
                  touched.boatRegistrationIdentification
                    ? ' is-invalid'
                    : '')
                }
              />

              <ErrorMessage
                name='boatRegistrationIdentification'
                component='div'
                className='invalid-feedback'
              />
            </div>
            <div className='form-group col-6'>
              <label htmlFor='lienHolderName'>Lien Holder Name</label>
              <Field
                name='lienHolderName'
                type='text'
                className={
                  'form-control' +
                  (errors.lienHolderName && touched.lienHolderName
                    ? ' is-invalid'
                    : '')
                }
              />

              <ErrorMessage
                name='lienHolderName'
                component='div'
                className='invalid-feedback'
              />
            </div>
          </div>
          {/* 14th row */}
          <div className='form-row both'>
            <div className='form-group col-6'>
              <label
                htmlFor='boatRegistrationIdentification'
                className='radion-lable-boat'
              >
                Can any person or organization claim ownership of your boat in
                the event of a loss?
              </label>
              <RadioButtonGroup
                id='lienRadioGroup'
                // label='One of these please'
                value={values.lienRadioGroup}
                error={errors.lienRadioGroup}
                touched={touched.lienRadioGroup}
              >
                <Field
                  component={RadioButton}
                  name='lienRadioGroup'
                  id='Yes, my boat has a lien holder'
                  label='Yes, my boat has a lien holder'
                />
                <Field
                  component={RadioButton}
                  name='lienRadioGroup'
                  id='No'
                  label='No'
                />
              </RadioButtonGroup>
            </div>

            <div className='form-group col-6'>
              <label
                htmlFor='boatRegistrationIdentification'
                className='radion-lable-boat'
              >
                Statement Required
              </label>
              <RadioButtonGroup
                id='statementCheck'
                // label='One of these please'
                value={values.statementCheck}
                error={errors.statementCheck}
                touched={touched.statementCheck}
              >
                <Field
                  component={RadioButton}
                  name='statementCheck'
                  id='I certify that the above statements are true and correct.'
                  label='I certify that the above statements are true and correct.'
                />
              </RadioButtonGroup>
            </div>
          </div>
          <div className='form-group mt-3 next-prev'>
            <button
              type='button'
              onClick={() => props.prev(values)}
              className='btn btn-primary back'
            >
              Back
            </button>
            <button type='submit' className='btn btn-primary next'>
              Continue
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const StepFive = (props) => {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  const handleSubmit = (values) => {
    props.next(values);
  };
  return (
    <Formik
      // initialValues={{
      //   profile: [],
      // }}
      initialValues={props.data}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        profile: Yup.array().min(2, 'Select at least 2 file'),
      })}
      // onSubmit={(fields) => {
      //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
      // }}
      // onSubmit={async (fields) => {
      //   await new Promise((r) => setTimeout(r, 300));
      //   alert(JSON.stringify(fields, null, 2));
      // }}
    >
      {({
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
          {/* 15th row */}
          <div className='row mt-2'>
            <div className='col-sm-12'>
              <input
                id='file'
                name='profile'
                type='file'
                onChange={(event) => {
                  const files = event.target.files;
                  let myFiles = Array.from(files);
                  setFieldValue('profile', myFiles);
                }}
                multiple
              />
              <ErrorMessage name='profile' />
            </div>
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey='data_url'
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <div className='row'>
                  <div className='boat-detail'>
                    Add min 4 photos of your Experience
                  </div>

                  {imageList.map((image, index) => (
                    <div className='col-sm-12 col-md-6 col-lg-6' key={index}>
                      <div className='form-row'>
                        <div
                          className='img-block-boat'
                          onClick={() => onImageUpdate(index)}
                        >
                          <img src={image.data_url} alt='' />
                        </div>
                        <div className='image-item__btn-wrapper'>
                          <div
                            className='close-icon-boat-img'
                            onClick={() => onImageRemove(index)}
                          >
                            <CancelRoundedIcon />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div
                    onClick={onImageUpload}
                    {...dragProps}
                    className='mt-3'
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={UploadImage} alt='not found' />
                  </div>
                </div>
              )}
            </ImageUploading>
          </div>
          <div className='form-group mt-3  next-prev'>
            <button
              type='button'
              onClick={() => props.prev(values)}
              className='btn btn-primary back'
            >
              Back
            </button>
            <button type='submit' className='btn btn-primary next'>
              Continue
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const StepSix = (props) => {
  const handleSubmit = (values) => {
    props.next(values);
  };
  return (
    <Formik
      // initialValues={{}}
      initialValues={props.data}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({})}
      // onSubmit={(fields) => {
      //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
      // }}
      // onSubmit={async (fields) => {
      //   await new Promise((r) => setTimeout(r, 300));
      //   alert(JSON.stringify(fields, null, 2));
      // }}
    >
      {({
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
          {/* 16th row */}
          <div style={{ marginTop: '20px' }}>
            <div className='row'>
              <div className='boat-detail'>Add availability of your boat</div>

              <div className='col-sm-12 col-md-6 col-lg-6'>
                <div className='form-row'>
                  <div className='inputGroup'>
                    <input id='option5' name='option9' type='radio' />
                    <label htmlFor='option5'>
                      Monday to Sunday, from 8:00 AM to 6:00 PM
                      <div className='boat-inusrance'>
                        Your boat will be available
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className='col-sm-12 col-md-6 col-lg-6'>
                <div className='form-row'>
                  <div className='inputGroup'>
                    <input id='option6' name='option9' type='radio' />
                    <label htmlFor='option6'>
                      Custom Availability
                      <div className='boat-inusrance'>
                        Customize start times for each day of the week.
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='form-group mt-3 next-prev'>
            <button
              type='button'
              onClick={() => props.prev(values)}
              className='btn btn-primary back'
            >
              Back
            </button>
            <button type='submit' className='btn btn-primary next'>
              Continue
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const StepSeven = (props) => {
  const handleSubmit = (values) => {
    props.next(values, true);
  };
  return (
    <Formik
      // initialValues={{
      //   cancellationPolicy: '',
      //   boatPricing: '',
      //   fuelPays: '',
      // }}
      initialValues={props.data}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        cancellationPolicy: Yup.string().required(
          'Cancellation Policy required'
        ),
        boatPricing: Yup.number()
          .min(2, 'Too Short!')
          .max(300, 'Too Long! max number is 300')
          .required('Boat Pricing required'),
        fuelPays: Yup.string().required('Fule Pays required'),
      })}
      // onSubmit={(fields) => {
      //   alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
      // }}
      // onSubmit={async (fields) => {
      //   await new Promise((r) => setTimeout(r, 300));
      //   alert(JSON.stringify(fields, null, 2));
      // }}
    >
      {({
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
          {/* 17th row */}
          <div style={{ marginTop: '20px' }}>
            <div className='row'>
              <div className='boat-detail'>
                Do you want to allow multiple bookings in a ingle day?
              </div>

              <div className='col-sm-12 col-md-6 col-lg-6'>
                <div className='form-row'>
                  <div className='inputGroup'>
                    <input id='option15' name='option19' type='radio' />
                    <label htmlFor='option15'>
                      No
                      <div className='boat-inusrance'>
                        This boat can only be booked once a day.
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className='col-sm-12 col-md-6 col-lg-6'>
                <div className='form-row'>
                  <div className='inputGroup'>
                    <input id='option16' name='option19' type='radio' />
                    <label htmlFor='option16'>
                      Yes{' '}
                      <div className='boat-inusrance'>
                        boat can be booked multiple times in a single day{' '}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 18th row */}
          <div style={{ marginTop: '20px' }}>
            <div className='row'>
              <div className='boat-detail'>Choose who operates your boat</div>

              <div className='col-sm-12 col-md-6 col-lg-6'>
                <div className='form-row'>
                  <div className='inputGroup'>
                    <input id='option25' name='option29' type='radio' />
                    <label htmlFor='option25'>
                      Renter operates my boat
                      <div className='boat-inusrance'>most common </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className='col-sm-12 col-md-6 col-lg-6'>
                <div className='form-row'>
                  <div className='inputGroup caption'>
                    <input id='option26' name='option29' type='radio' />
                    <label htmlFor='option26' className='uscg-certified'>
                      A USCG-Certified caption operates my boat
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 19th row */}
          <div className='form-row both'>
            {/* <div className='form-group col-6'> */}
            <div className='form-group'>
              <div className='boat-detail'>
                How would you like to handle reservation cancellations?
              </div>
              <RadioButtonGroup
                id='cancellationPolicy'
                // label='One of these please'
                value={values.cancellationPolicy}
                error={errors.cancellationPolicy}
                touched={touched.cancellationPolicy}
              >
                <Field
                  component={RadioButton}
                  name='cancellationPolicy'
                  id='Flexible'
                  label='Flexible'
                />
                <Field
                  component={RadioButton}
                  name='cancellationPolicy'
                  id='Moderate'
                  label='Moderate'
                />
                <Field
                  component={RadioButton}
                  name='cancellationPolicy'
                  id='Strict'
                  label='Strict'
                />
              </RadioButtonGroup>
            </div>
          </div>
          {/* 20th row */}
          <div className='form-row both'>
            <div className='form-group col-6'>
              <label htmlFor='boatPricing'>Hourly Rate ($)</label>
              <Field
                name='boatPricing'
                type='text'
                className={
                  'form-control' +
                  (errors.boatPricing && touched.boatPricing
                    ? ' is-invalid'
                    : '')
                }
              />

              <ErrorMessage
                name='boatPricing'
                component='div'
                className='invalid-feedback'
              />
            </div>
            <div className='form-group col-6'>
              <div className='boat-detail'>Who pays for fuel? </div>
              <RadioButtonGroup
                id='fuelPays'
                // label='One of these please'
                value={values.fuelPays}
                error={errors.fuelPays}
                touched={touched.fuelPays}
              >
                <Field
                  component={RadioButton}
                  name='fuelPays'
                  id='Rental Pays'
                  label='Rental Pays'
                />
                <Field
                  component={RadioButton}
                  name='fuelPays'
                  id='Owner Pays'
                  label='Owner Pays'
                />
              </RadioButtonGroup>
            </div>
          </div>
          <div className='form-group mt-3 next-prev'>
            <button
              type='button'
              onClick={() => props.prev(values)}
              className='btn btn-primary back'
            >
              Back
            </button>
            <button type='submit' className='btn btn-primary next'>
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
