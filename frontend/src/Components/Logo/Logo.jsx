import { NavLink } from 'react-router-dom';

export default function Logo({ src }) {
  return (
    <NavLink to="/" className="logo">
      <img className="logo__image" src={src} alt="Логотип" />
    </NavLink>
  );
}
