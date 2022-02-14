//FormikErrorLabel component

import React from 'react';

const FormikErrorLabel = ({ error, children, ...props }) => {
  return <label {...props}>{children}</label>;
};
export default FormikErrorLabel;
