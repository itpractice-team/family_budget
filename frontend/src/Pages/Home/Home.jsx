import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Home.scss';
import InfoPopup from '../../Components/InfoPopup/InfoPopup';
import { toggleInfoPopup, toggleRegisterPopup } from '../../store/slices/togglePopupSlice';
import СonfirmationPasswordChange from '../../Components/СonfirmationPasswordChange/СonfirmationPasswordChange';
import { getUser } from '../../store/slices/userSlice';
import Footer from '../../Components/Footer/Footer';
import Button from '../../ui/Button/Button';
import { arrAdvantages, arrCardWorks, arrInitFQAHome } from '../../utils/consts';
import CardQuestion from '../../Components/CardQuestion/CardQuestion';
import Advantages from './Advantages/Advantages';
import CardWork from './CardWork/CardWork';

export default function Main({ children }) {
  const dispatch = useDispatch();

  const isInfoPopupOpen = useSelector((state) => state.popup.isInfoPopupOpen);
  const isFetched = useSelector((state) => state.user.isFetched);

  useEffect(() => {
    if (!isFetched) {
      dispatch(getUser());
    }
  }, [dispatch, isFetched]);

  const closeInfoPopup = () => dispatch(toggleInfoPopup(false));

  const handleRegisterClick = () => {
    dispatch(toggleRegisterPopup(true));
  };

  return (
    <section className="home-page">
      {children}
      <div className="home-page__container-title">
        <h1 className="home-page__title">Контроль расходов «Семейный бюджет»</h1>
        <p className="home-page__description">
          Отслеживай свои расходы и будь в курсе своего финансового состояния
        </p>

        <Button
          variant="primary"
          content="text"
          text="Зарегистрироваться"
          size="large"
          onClick={handleRegisterClick}
        />
      </div>

      <div className="home-page__img" />
      <h3 className="home-page__subtitle">Преимущества</h3>
      <ul className="home-page__lists-advantages">
        {arrAdvantages.map((i) => {
          return (
            <Advantages title={i.title} description={i.description} icon={i.icon} key={i.id} />
          );
        })}
      </ul>
      <div className="home-page__container-how-works">
        <h3 className="home-page__subtitle">Как это работает</h3>
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
        <h3 className="home-page__text-bold home-page__text-start">Часто задаваемые вопросы</h3>
        <ul>
          {arrInitFQAHome.map((q) => {
            return <CardQuestion question={q.question} answer={q.answer} key={q.id} />;
          })}
        </ul>
        <h3 className="home-page__text-bold home-page__text-start">
          Готовы начать контролировать бюджет?
        </h3>
        <Button
          variant="primary"
          content="text"
          text="Начать"
          size="large"
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
      <Footer extraClass="footer" />
    </section>
  );
}
