import './LeftBlock.scss';
import Account from '../Account/Account';
import Speedometer from '../Speedometer/Speedometer';
import Categories from '../Categories/Categories';

export default function LeftBlock() {
  return (
    <section className="left-block">
      <Account />
      <Speedometer income={111000} spend={77000} />
      <Categories />
    </section>
  );
}
