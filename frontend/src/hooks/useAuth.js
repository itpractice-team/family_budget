import { useSelector } from 'react-redux';

export default function useAuth() {
  const { email, login, userName, phone, currency, token } = useSelector((state) => state.user);
  return {
    isAuth: !!email,
    email,
    login,
    userName,
    phone,
    currency,
    token,
  };
}
