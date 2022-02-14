import classNames from 'classnames';
import './AddNewBoats.scss';

export const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      {/* <input
        name={name}
        id={id}
        type='radio'
        value={id} // could be something else for output?
        checked={id === value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames('radio-button')}
        {...props}
      />
      <label htmlFor={id}>{label}</label> */}

      <label htmlFor={id}>
        <input
          name={name}
          id={id}
          type='radio'
          value={id} // could be something else for output?
          checked={id === value}
          onChange={onChange}
          onBlur={onBlur}
          className={classNames('radio-button')}
          {...props}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};

export const InputFeedback = ({ error }) =>
  error ? (
    <div
      className={classNames('input-feedback')}
      style={{ color: '#dc3545', fontSize: '14px' }}
    >
      {error}
    </div>
  ) : null;

// Radio group
export const RadioButtonGroup = ({
  value,
  error,
  touched,
  id,
  label,
  className,
  children,
}) => {
  const classes = classNames(
    'input-field',
    {
      'is-success': value || (!error && touched), // handle prefilled or user-filled
      'is-error': !!error && touched,
    },
    className
  );

  return (
    <div className={classes}>
      <fieldset>
        <legend>{label}</legend>
        {children}
        {touched && <InputFeedback error={error} />}
      </fieldset>
    </div>
  );
};
