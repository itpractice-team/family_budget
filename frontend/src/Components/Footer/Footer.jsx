import './Footer.scss';
import FooterContent from './FooterContent/FooterContent';

export default function Footer({ extraClass }) {
  return (
    <footer className={`footer ${extraClass}`}>
      <FooterContent />
    </footer>
  );
}
