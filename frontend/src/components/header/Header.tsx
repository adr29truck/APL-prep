import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Header.css';
import Typography from '@material-ui/core/Typography';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { getCurrentTime } from '../../features/time/selectors';

const Header = () => {
  const dispatch = useDispatch();
  const day = useSelector(getCurrentTime);

  function onClickLeftArrow() {
    dispatch({ type: 'time/reduceTime' });
  }
  function onClickRightArrow() {
    dispatch({ type: 'time/increaseTime' });
  }

  return (
    <Fragment>
      <header>
        <ArrowLeftIcon onClick={onClickLeftArrow} />
        <h3 className="text-center">Timeline</h3>
        <ArrowRightIcon onClick={onClickRightArrow} />
      </header>
      <Typography
        variant="h2"
        component="h2"
        gutterBottom
        className="text-center"
      >
        {day}
      </Typography>
    </Fragment>
  );
};

export default Header;
