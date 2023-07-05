/* eslint-disable no-shadow */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import { addMoneybox } from '../../store/slices/moneybox';
import CancelButton from '../CancelButton/CancelButton';
import usePopup from '../../utils/hooks/usePopup';
import addMoneyboxValidation from '../../utils/validations/addMoneyboxValidation';

export default function AddMoneyboxPopup({ onClose }) {
  const dispatch = useDispatch();

  const { openPopup: openInfoPopup } = usePopup('info');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(addMoneyboxValidation),
    mode: 'onChange',
  });

  const onSubmit = (formData) => {
    dispatch(addMoneybox(formData)).then(() => {
      onClose();
      openInfoPopup();
    });
  };

  return (
    <Popup onClose={onClose} popupSize="popup_s" title="Задайте свою цель для накопления">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label className="form__input-label" htmlFor="Moneybox-name">
          Название конверта
          <input
            id="Moneybox-name"
            {...register('name')}
            className={`form__input ${errors.name ? 'error' : ''}`}
            type="text"
            placeholder="Введите название"
          />
          {errors.name && (
            <span className="form__valid-message form__valid-message_active">
              {errors.name.message}
            </span>
          )}
        </label>
        <div className="form__input-block">
          <label className="form__input-label form__input-label_divider" htmlFor="Moneybox-amount">
            Итоговая сумма
            <input
              id="Moneybox-amount"
              {...register('amount')}
              className={`form__input form__input_sum ${errors.amount ? 'error' : ''}`}
              type="number"
              placeholder="Введите сумму для накопления"
            />
            {errors.amount && (
              <span className="form__valid-message form__valid-message_active">
                {errors.amount.message}
              </span>
            )}
          </label>
        </div>
        <label className="form__input-label form__input-label_textarea" htmlFor="Moneybox-comment">
          Комментарий
          <textarea
            id="Moneybox-comment"
            {...register('description')}
            className="form__input form__input_textarea"
            placeholder="Заметка о цели"
          />
        </label>
        <div className="form__button-wrapper form__button-wrapper_add-operation">
          <CancelButton onClose={onClose} />
          <Button
            type="submit"
            variant="primary"
            content="text"
            text="Сохранить"
            size="medium"
            disabled={!isValid}
          />
        </div>
      </form>
    </Popup>
  );
}
