import './PlugRightBlock.scss';

export default function PlugRightBlock({ icon, subtitle }) {
  return (
    <article className="plug">
      <img className="plug-icon" src={icon} alt="Иконка копилки" />
      <p className="plug-subtitle">{subtitle}</p>
    </article>
  );
}
