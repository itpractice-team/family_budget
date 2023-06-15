import './LeftBlock.scss';
import Account from '../Account/Account';
import Speedometer from '../Speedometer/Speedometer';
import Categories from '../Categories/Categories';

export default function LeftBlock() {
  return (
    <section className="left-block">
      <Account />
      <Speedometer income={25000} spend={11000} />
      <Categories />
    </section>
  );
}
