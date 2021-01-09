import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export const DayButton = (props) => {
  // props
  // object - obj {id, isChecked, style, name}
  // onClickCheckBox - Func

  return (
  <FormControlLabel
    control={
      <Checkbox
        style={ props.object.style }
        name={props.object.name}
        // checked={props.object.isChecked}
        color="primary"
        id={toString(props.object.id)}
        onChange={props.onClickCheckBox}
      />
    }
    label={ props.object.label }
  />)
}