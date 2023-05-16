import './Logo.scss';
import { NavLink } from 'react-router-dom';

export default function Logo() {
  return (
    <NavLink to="/" className="logo">
      LOGO
    </NavLink>
  );
}
