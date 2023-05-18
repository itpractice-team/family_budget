/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line react/prop-types
// eslint-disable-next-line import/no-extraneous-dependencies
import { Tooltip } from 'react-tooltip'
import { useState } from 'react';
import Content from '../../Components/Content/Content';
import avatar from '../../Images/avatar.svg';
import question from '../../Images/question.svg';
import './Profile.scss';

export default function Profile() {

  const [disable, setDisable] = useState(true)

  return (
    <Content>
      <h2 className='profile__title'>Настройки профиля</h2>
      <p className='profile__text'>Здесь можно менять настройки, как душе угодно</p>
      <h3 className='profile__data-title'>Данные пользователя</h3>
      <section className='profile__data'>
        <div className="profile__avatar">
          <img src={avatar} alt="Иконка аватара" />
          <div className='profile__avatar-edit'>
            <button className='profile__button' type='button'>Загрузить новое фото</button>
            <span className='avatar-edit__span'>Размер изображения не&nbsp;должен превышать 5 мб, формат jpg и png</span>
          </div>
        </div>
        <ul className='profile__data-list'>
          <li className='profile__data-item'>
            <label className='profile__data-label'>Логин</label>
            <input className='profile__data-input' type="text" value='Ivan Petrov' disabled={disable} />
            <img className='profile__tooltip' data-tooltip-id="login" data-tooltip-content="Прописные и строчные латинские буквы, цифры, нижний слэш, точка,+,-, без пробелов и иных символов, min количество символов - 2, max - 25, нечувствительный к регистру" src={question} alt="" />
            <Tooltip
              data-tooltip-variant='info'
              className="react-tooltip"
              classNameArrow="react-tooltip-arrow"
              id='login'
              place="bottom"
            />
          </li>
          <li className='profile__data-item'>
            <p className='profile__data-label'>E-mail</p>
            <input className='profile__data-input' type="text" value='example@mail.ru' disabled={disable} />
            <img className='profile__tooltip' data-tooltip-id="login" data-tooltip-content="Прописные и строчные латинские буквы, цифры, нижний слэш, точка,+,-, без пробелов и иных символов, min количество символов - 2, max - 25, нечувствительный к регистру" src={question} alt="" />
            <Tooltip
              data-tooltip-variant='info'
              className="react-tooltip"
              classNameArrow="react-tooltip-arrow"
              id='login'
              place="bottom"
            />
          </li>
          <li className='profile__data-item'>
            <p className='profile__data-label password'>Пароль</p>
            <input className='profile__data-input' type="text" value='*******' disabled='true' />
            <img className='profile__tooltip' data-tooltip-id="login" data-tooltip-content="Прописные и строчные латинские буквы, цифры, нижний слэш, точка,+,-, без пробелов и иных символов, min количество символов - 2, max - 25, нечувствительный к регистру" src={question} alt="" />
            <Tooltip
              data-tooltip-variant='info'
              className="react-tooltip"
              classNameArrow="react-tooltip-arrow"
              id='login'
              place="bottom"
            />
          </li>
          <li className='profile__data-item btn-edit-password'>
            <button className='profile__button' type='button'>Сменить пароль</button>
          </li>
          <li className='profile__data-item'>
            <p className='profile__data-label'>Имя</p>
            <input className='profile__data-input' type="text" value='Иван' disabled={disable} />
            <img className='profile__tooltip' data-tooltip-id="login" data-tooltip-content="Прописные и строчные латинские буквы, цифры, нижний слэш, точка,+,-, без пробелов и иных символов, min количество символов - 2, max - 25, нечувствительный к регистру" src={question} alt="" />
            <Tooltip
              data-tooltip-variant='info'
              className="react-tooltip"
              classNameArrow="react-tooltip-arrow"
              id='login'
              place="bottom"
            />
          </li>
          <li className='profile__data-item'>
            <p className='profile__data-label'>Фамилия</p>
            <input className='profile__data-input' type="text" value='Петров' disabled={disable} />
          </li>
          <li className='profile__data-item'>
            <p className='profile__data-label'>Телефон</p>
            <input className='profile__data-input' type="text" value='+7 987 654 32 10' disabled={disable} />
          </li>
          <li className='profile__data-item'>
            <label className='profile__data-label'>Какая основная валюта</label>
            <input className='profile__data-input' type="text" value='Рубли' disabled={disable} />
          </li>
        </ul>
        <div className='profile__data-actions'>
          <button
            className='profile__button btn-edit-profile'
            type='button'
            onClick={() => setDisable(false)}
          >Изменить данные
          </button>
          <button className='profile__button btn-delete-profile' type='button'>Удалить профиль</button>
        </div>
      </section>
    </Content>
  );
}
