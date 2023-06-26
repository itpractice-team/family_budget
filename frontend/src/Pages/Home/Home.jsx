import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Home.scss';
import InfoPopup from '../../Components/InfoPopup/InfoPopup';
import СonfirmationPasswordChange from '../../Components/СonfirmationPasswordChange/СonfirmationPasswordChange';
import { getUser } from '../../store/slices/accountSlice';
import Footer from '../../Components/Footer/Footer';
import Button from '../../ui/Button/Button';
import { arrAdvantages, arrCardWorks, arrInitFQAHome } from '../../utils/consts';
import CardQuestion from '../../Components/CardQuestion/CardQuestion';
import Advantages from './Advantages/Advantages';
import CardWork from './CardWork/CardWork';
import main from '../../Images/main.svg';
import usePopup from '../../utils/hooks/usePopup';

export default function Main() {
  const dispatch = useDispatch();

  const { isOpen: isInfoPopupOpen, closePopup: closeInfoPopup } = usePopup('info');
  const { openPopup: openRegisterPopup } = usePopup('register');

  const isFetched = useSelector((state) => state.account.isFetched);

  useEffect(() => {
    if (!isFetched) {
      dispatch(getUser());
    }
  }, [dispatch, isFetched]);

  const handleRegisterClick = () => openRegisterPopup;

  return (
    <section className="home-page">
      <div className="home-page__container-title">
        <h1 className="home-page__title">Контроль расходов «Семейный бюджет»</h1>
        <p className="home-page__description">
          Отслеживай свои расходы и будь в&nbsp;курсе своего финансового состояния
        </p>

        <Button
          variant="primary"
          content="text"
          text="Зарегистрироваться"
          size="large"
          onClick={handleRegisterClick}
        />
      </div>

      <img className="home-page__image" src={main} alt="Скрин приложения" />
      <h3 id="advantages" className="home-page__subtitle">
        Преимущества
      </h3>
      <ul className="home-page__lists-advantages">
        {arrAdvantages.map((i) => {
          return (
            <Advantages title={i.title} description={i.description} icon={i.icon} key={i.id} />
          );
        })}
      </ul>
      <div id="how-works" className="home-page__container-how-works">
        <h3 className="home-page__subtitle">Как это работает?</h3>
        <ul className="home-page__lists-how-works">
          {arrCardWorks.map((i) => {
            return (
              <CardWork
                title={i.title}
                description={i.description}
                img={i.img}
                key={i.id}
                number={i.number}
              />
            );
          })}
        </ul>
      </div>
      <div className="home-page__container-fqa">
        <h3 className="home-page__text-bold">Часто задаваемые вопросы</h3>
        <ul className="home-page__fqa-list">
          {arrInitFQAHome.map((q) => {
            return <CardQuestion question={q.question} answer={q.answer} key={q.id} />;
          })}
        </ul>
        <h3 className="home-page__text-bold">Готовы начать контролировать бюджет?</h3>
        <Button
          variant="primary"
          content="text"
          text="Начать"
          size="large"
          extraClass="home-page__button"
          onClick={handleRegisterClick}
        />
      </div>
      {isInfoPopupOpen && (
        <InfoPopup
          onClose={closeInfoPopup}
          content={<СonfirmationPasswordChange />}
          title="Пароль успешно изменен"
        />
      )}
      <Footer extraClass="footer-absolute" />
    </section>
  );
}
