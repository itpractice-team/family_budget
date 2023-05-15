import './Logo.scss';
import { NavLink } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function Logo() {
  return (
    <NavLink to='/' className="logo">
      LOGO
    </NavLink>

  );
}
