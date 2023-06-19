import './LeftBlock.scss';
import UserFinance from '../UserFinance/UserFinance';
import Speedometer from '../Speedometer/Speedometer';
import Categories from '../Categories/Categories';

export default function LeftBlock() {
  return (
    <section className="left-block">
      <UserFinance />
      <Speedometer income={111000} spend={77000} />
      <Categories />
    </section>
  );
}
