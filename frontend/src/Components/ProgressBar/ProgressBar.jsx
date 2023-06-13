import './ProgressBar.scss';

export default function ProgressBar({ balance, target }) {
  const progress = (balance / target) * 100;
  const isDone = progress >= 100;

  return (
    <div className="progress-bar">
      <div
        className={`progress-bar__fill ${isDone ? 'done' : ''}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
