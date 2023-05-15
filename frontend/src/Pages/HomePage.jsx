/* eslint-disable react/button-has-type */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks/useAuth';

function HomePage() {
  const dispatch = useDispatch();

  const { isAuth, email } = useAuth();

  return isAuth ? (
    <div>
      <h1>Welcome</h1>

      <button onClick={() => dispatch()}>Log out from {email}</button>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default HomePage;
