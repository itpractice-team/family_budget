import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Budget.scss';
import { getUser } from '../../store/slices/accountSlice';
import LeftBlock from '../../Components/LeftBlock/LeftBlock';
import RightBlock from '../../Components/RightBlock/RightBlock';
import MainBlock from '../../Components/MainBlock/MainBlock';

export default function Budget() {
  const dispatch = useDispatch();

  const isFetched = useSelector((state) => state.account.isFetched);

  useEffect(() => {
    if (!isFetched) {
      dispatch(getUser());
    }
  }, [dispatch, isFetched]);

  return (
    <section className="budget">
      <LeftBlock />
      <MainBlock />
      <RightBlock />
    </section>
  );
}
