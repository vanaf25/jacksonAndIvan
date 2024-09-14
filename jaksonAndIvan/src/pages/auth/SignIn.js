import { useState, useCallback } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { signIn } from '../../redux/actions/authAction';

import styles from './Auth.module.scss';

const creds = {
  email: '',
  password: '',
};

const SignIn = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [input, setInput] = useState(creds);

  const changeHandler = useCallback(
    (e) => {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    },
    [input],
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(signIn(input));
      setInput(creds);
    },
    [input],
  );

  if (auth.user?.id) return <Redirect to="/" />;

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.innerCard}>
            <div className={styles.authList}>
              <label htmlFor="email" className={styles.title}>
                Email <span className={styles.required}>*</span>
              </label>
              <input
                className={styles.input}
                name="email"
                value={input.email}
                onChange={changeHandler}
              />
            </div>
            <div className={styles.authList}>
              <label htmlFor="password" className={styles.title}>
                Password <span className={styles.required}>*</span>
              </label>
              <input
                className={styles.input}
                name="password"
                type="password"
                value={input.password}
                onChange={changeHandler}
              />
            </div>
          </div>
          <button type="submit" className={styles.button}>
            Login
          </button>
          <div className={styles.signInSection}>
            Don&lsquo;t have an account? &nbsp;
            <Link to="/sign-up" className={styles.signIn}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
