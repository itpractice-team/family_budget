import './TemplateRightBlock.scss';
import Button from '../../ui/Button/Button';

export default function TemplateRightBlock({ title, icon, subtitle }) {
  return (
    <section className="template">
      <h2 className="template__title">{title}</h2>
      <div className="template__plug">
        <img className="template__plug-icon" src={icon} alt="Иконка копилки" />
        <p className="template__plug-subtitle">{subtitle}</p>
      </div>
      <Button
        variant="secondary"
        type="text"
        text="Добавить/Редактировать"
        extraClass="template__button"
      />
    </section>
  );
}
