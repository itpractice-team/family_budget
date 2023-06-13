import './Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__title">Правильные финансовые решения каждый день</p>
        <p className="footer__copyrights">&copy; {new Date().getFullYear()} Copyrights</p>
      </div>
    </footer>
  );
}
