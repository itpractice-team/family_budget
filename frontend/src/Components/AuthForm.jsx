/* eslint-disable react/button-has-type */
import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
function AuthForm({ handleClick, message }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="password"
      />
      <button onClick={() => handleClick(email, pass)}>clickToLogin</button>
      <span>{message}</span>
    </div>
  );
}
AuthForm.propTypes = {
  handleClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default AuthForm;
