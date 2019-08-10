import { useState, useEffect } from 'react';
import dateString from '../utils/dateString';
import convertUTC from '../utils/convertUTC';

export default props => {
  const [edit, setEdit] = useState(false),
  blank = props.state[props.attribute] === '',
  type = blank || typeof props.state[props.attribute] === 'string'? 'text' : 'date';

  useEffect(() => {
    setEdit(false)
  }, [props.on])

  return (
    <span>
      <input
        autoFocus
        type={type} 
        onChange={event => {
          props.editState(
            {...props.state,
              [props.attribute]: type == 'text'? event.target.value : convertUTC(event.target.value)
            }
          )
        }}
        value={type == 'text'? props.state[props.attribute] : dateString(props.state[props.attribute])[1]}
        style={{display: props.on && edit? 'inline' : 'none'}}
      />
      <span style={{color: blank? "#ddd" : "#444", fontStyle: blank? 'italic' : 'normal', display: props.on && edit? 'none' : 'inline'}}>
        {blank? 'Untitled' : type == 'text'? props.state[props.attribute] : dateString(props.state[props.attribute])[0]}
      </span>
      {props.on? <i
      className={"glyphicon glyphicon-pencil"}
      onClick={() => {
        setEdit(!edit);
      }}
      ></i> : ''}
    </span>
  )
};