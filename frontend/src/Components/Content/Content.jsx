import './Content.scss';
import PropTypes from 'prop-types';

export default function Content({children}) {
  return (
    <main className="content">
      {children}
    </main>
  );
}
Content.propTypes = {
  children: PropTypes.node.isRequired,
};
