import React from 'react';
import { useDispatch } from 'react-redux';

import './Header.css';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const Header = () => {
  const dispatch = useDispatch();

  function onClickLeftArrow() {
    dispatch({ type: 'time/reduceTime' });
  }
  function onClickRightArrow() {
    dispatch({ type: 'time/increaseTime' });
  }

  return (
    <header>
      <ArrowLeftIcon onClick={onClickLeftArrow} />
      <h3 className="text-center">Timeline</h3>
      <ArrowRightIcon onClick={onClickRightArrow} />
    </header>
  );
};

export default Header;
