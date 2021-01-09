import '../Header.css';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

export const Header = (props) => {
  return (<header>
    <ArrowLeftIcon onClick={props.onClickLeftArrow}/>
    <h3 className="text-center">Timeline</h3>
    <ArrowRightIcon onClick={props.onClickRightArrow}/>
  </header>)
}