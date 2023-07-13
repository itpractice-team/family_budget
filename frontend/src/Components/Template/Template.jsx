import './Template.scss';
import Button from '../../ui/Button/Button';

export default function Template({ title, children, onClick }) {
  return (
    <section className="template">
      <h2 className="template__title">{title}</h2>
      {children}
      <Button
        variant="secondary"
        content="text"
        text="Добавить"
        size="medium"
        extraClass="template__button"
        onClick={onClick}
      />
    </section>
  );
}
