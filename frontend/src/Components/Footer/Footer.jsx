import "./Footer.scss"
import envelope from '../../Images/envelope.svg'

// eslint-disable-next-line react/prop-types
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__column-first">
        <p className="footer__title">Правильные финансовые решения каждый день</p>
        <p className="footer__copyrights">&copy; 2023 Copyrights</p>
      </div>
      <div className="footer__column-second">
        <p className="footer__text">Всегда готовы выслушать ваши вопросы<br />и предложения</p>
        <p className="footer__email">
          <img src={envelope} alt="Иконка почты" />example@mail.ru
        </p>
      </div>
    </footer>
  );
}