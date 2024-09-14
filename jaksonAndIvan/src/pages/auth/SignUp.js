import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Select from 'react-select';

import { signUp } from '../../redux/actions/authAction';

import styles from './Auth.module.scss';

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: '60%',
  }),
  control: () => ({
    width: 292,
    display: 'flex',
    background: '#0d0e16',
    border: 'none',
    fontFamily: 'Gilroy-Medium',
    fontSize: '14px !important',
    padding: '0px 4px !important',
    height: '50px',
    borderRadius: '8px',
    color: '#fff',
  }),
  menu: (provided) => ({
    ...provided,
    color: '#000',
    padding: 10,
    marginTop: '-10px',
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'var(--red)' : '#000',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    const color = '#fff';
    return { ...provided, opacity, transition, color };
  },
};

const options = [
  { value: 'office', label: 'Office Manager' },
  { value: 'production', label: 'Production Manager' },
  { value: 'sales', label: 'Sales Manager' },
  { value: 'corporate', label: 'Corporate Manager' },
];

const user = {
  email: '',
  password: '',
  confirmPw: '',
};

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [input, setInput] = useState(user);
  const [selectedRole, setSelectedRole] = useState('office');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const tick = setTimeout(() => {
      setErrors({});
    }, 4000);

    return () => clearTimeout(tick);
  }, [errors]);

  const validate = useCallback((data) => {
    const error = {};
    let isValid = true;

    if (typeof data.email !== 'undefined') {
      const pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      );

      if (!pattern.test(data.email)) {
        isValid = false;
        error.email = 'Please enter a valid email address.';
      }
    }

    if (!data.password) {
      isValid = false;
      error.password = 'Password is required.';
    }

    if (!data.confirmPw) {
      isValid = false;
      error.confirmPw = 'Retype a password again.';
    }

    if (data.password && data.confirmPw && data.password !== data.confirmPw) {
      isValid = false;
      error.match = 'Passwords did not match.';
    }

    setErrors({
      error,
    });

    return isValid;
  }, []);

  const selectHandler = useCallback((data) => {
    setSelectedRole(data.value);
  }, []);

  const changeHandler = useCallback(
    (e) => {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
      e.preventDefault();
    },
    [input],
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const isValid = validate(input);

      if (isValid) {
        dispatch(
          signUp({
            email: input.email,
            password: input.password,
            role: selectedRole,
            status: 'pending',
          }),
        );
        setInput(user);
        history.push('/sign-in');
      }
    },
    [input, selectedRole, history, validate],
  );

  if (auth.user?.status === 'approved') return <Redirect to="/" />;

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.innerCard}>
            <div className={styles.authList}>
              <label htmlFor="role" className={styles.title}>
                Select a role
              </label>
              <Select
                defaultValue={options[0]}
                name="role"
                onChange={selectHandler}
                styles={customStyles}
                options={options}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
            <div>
              <div className={styles.authList}>
                <label htmlFor="email" className={styles.title}>
                  Email <span className={styles.required}>*</span>
                </label>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeHandler}
                />
              </div>
              {errors?.error?.email && <p className={styles.alertTxt}>{errors.error.email}</p>}
            </div>
            <div>
              <div className={styles.authList}>
                <label htmlFor="password" className={styles.title}>
                  Password <span className={styles.required}>*</span>
                </label>
                <input
                  className={styles.input}
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={changeHandler}
                />
              </div>
              {errors?.error?.password && (
                <p className={styles.alertTxt}>{errors.error.password}</p>
              )}
            </div>
            <div>
              <div className={styles.authList}>
                <label htmlFor="confirmPw" className={styles.title}>
                  Confirm Password <span className={styles.required}>*</span>
                </label>
                <input
                  className={styles.input}
                  type="password"
                  name="confirmPw"
                  value={input.confirmPw}
                  onChange={changeHandler}
                />
              </div>
              {errors?.error?.confirmPw && (
                <p className={styles.alertTxt}>{errors.error.confirmPw}</p>
              )}
              {errors?.error?.match && <p className={styles.alertTxt}>{errors.error.match}</p>}
            </div>
          </div>
          <button type="submit" className={styles.button}>
            Create an account
          </button>
          <div className={styles.signInSection}>
            Already have an account? &nbsp;
            <Link to="/sign-in" className={styles.signIn}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
