import './Template.scss';
import Button from '../../ui/Button/Button';

export default function Template({ title, children }) {
  return (
    <section className="template">
      <h2 className="template__title">{title}</h2>
      {children}
      <Button
        variant="secondary"
        type="text"
        text="Добавить"
        size="medium"
        extraClass="moneybox__button"
      />
    </section>
  );
}
