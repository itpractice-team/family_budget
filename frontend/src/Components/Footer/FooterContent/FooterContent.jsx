import './FooterContent.scss';
import logo from '../../../Images/logo-heavy-blue.svg';

export default function FooterContent() {
  return (
    <div className="footer-content">
      <img src={logo} alt="Логотип" />
      <div className="footer-content__text-content">
        <p className="footer-content__title">Правильные финансовые решения каждый день</p>
        <p className="footer-content__text">&copy; {new Date().getFullYear()} InCoin.</p>
      </div>
    </div>
  );
}
