import { useState } from 'react';
import dateString from '../utils/dateString';
import convertUTC from '../utils/convertUTC';

export default props => {
  const [edit, setEdit] = useState(false)
  const blank = props.state[props.attribute] === '' || props.state[props.attribute] === null;
  const style = {color: blank? "#ddd" : "444", fontStyle: blank? 'italic' : 'normal'}
  const type = blank || typeof props.state[props.attribute] === 'string'? 'text' : 'date';

  return (
    <span>
      <input
        autoFocus
        type={type} 
        placeholder="Untitled"
        onChange={event => {
          props.editState(
            {...props.state,
              [props.attribute]: type == 'text'? blank? null : event.target.value : convertUTC(event.target.value)
            }
          )
        }}
        value={blank? ' ' : type == 'text'? props.state[props.attribute] : dateString(props.state[props.attribute])[1]}
        style={{display: edit? 'inline' : 'none'}}
      />
      <span style={{...style, display: edit? 'none' : 'inline'}}>
        {blank? 'Untitled' : type == 'text'? props.state[props.attribute] : dateString(props.state[props.attribute])[0]}
      </span>
      <i
      className={"glyphicon glyphicon-pencil"}
      onClick={() => {
        setEdit(!edit);
      }}
      ></i>
    </span>
  )
};