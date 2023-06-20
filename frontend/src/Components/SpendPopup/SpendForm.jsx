import SelectButtonWrapper from '../SelectButtonWrapper/SelectButtonWrapper';
import Button from '../../ui/Button/Button';

export default function SpendForm({
  formData,
  handleChange,
  handleAddSpend,
  handleCancel,
  categoryOptions,
  financeOptions,
}) {
  return (
    <form className="form form_add-operation" onSubmit={handleAddSpend}>
      <div className="form__input-block">
        <label className="form__input-label" htmlFor="SpendPopup-date">
          Дата
          <input
            id="SpendPopup-date"
            name="created"
            className="form__input"
            type="date"
            value={formData.created}
            onChange={(evt) => handleChange({ name: 'created', value: evt.target.value })}
          />
        </label>
      </div>

      <SelectButtonWrapper
        label="Категория расхода"
        options={categoryOptions}
        initialValue={formData.category}
        imageKey="image"
        nameKey="name"
        altText="Иконка категории"
        handleOptionChange={(value) => handleChange({ name: 'category', value })}
      />

      <div className="form__input-block">
        <label className="form__input-label" htmlFor="SpendPopup-name">
          Название
          <input
            id="SpendPopup-name"
            name="name"
            className="form__input"
            type="text"
            placeholder="Введите название"
            value={formData.name}
            onChange={(evt) => handleChange({ name: 'name', value: evt.target.value })}
          />
        </label>
      </div>

      <div className="form__input-block">
        <label className="form__input-label form__input-label_divider" htmlFor="SpendPopup-amount">
          Сумма
          <input
            id="SpendPopup-amount"
            name="amount"
            className="form__input form__input_sum"
            type="number"
            placeholder="Введите сумму"
            value={formData.amount}
            onChange={(evt) => handleChange({ name: 'amount', value: evt.target.value })}
          />
        </label>
      </div>

      <SelectButtonWrapper
        label="Счёт списания"
        options={financeOptions}
        initialValue={formData.finance}
        imageKey="image"
        nameKey="name"
        altText="Иконка банка"
        handleOptionChange={(value) => handleChange({ name: 'finance', value })}
      />

      <div className="form__button-wrapper form__button-wrapper_add-operation">
        <Button
          variant="secondary"
          content="text"
          text="Отменить"
          size="medium"
          onClick={handleCancel}
        />
        <Button type="submit" variant="primary" content="text" text="Готово" size="medium" />
      </div>
    </form>
  );
}
