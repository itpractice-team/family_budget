import { Link } from 'react-router-dom';
import Login from '../Components/Login';

function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <Login />
      <p>
        Or <Link to="/">mainPage</Link>
      </p>
    </div>
  );
}

export default LoginPage;
