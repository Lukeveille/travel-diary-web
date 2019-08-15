import { useState, useEffect } from 'react';
import dateString from '../utils/dateString';
import convertUTC from '../utils/convertUTC';

export default props => {
  const [edit, setEdit] = useState(false),
  [hover, setHover] = useState(false),
  [temp, setTemp] = useState(undefined),
  blank = props.state[props.attribute] === '',
  type = blank || typeof props.state[props.attribute] === 'string'? 'text' : 'date';

  useEffect(() => {
    setEdit(false)
  }, [props.on])

  return (
    <span
      style={{cursor: 'pointer'}}
      onMouseOver={() => { setHover(true) }}
      onMouseLeave={() => { setHover(edit? true : false) }}
      onClick={() => {
        setTemp(props.state[props.attribute]);
      }}
    >
      <input
        autoFocus
        type={type}
        onKeyDown={ event => {
          if (event.keyCode === 13) {
            setEdit(!edit);
            setHover(false);
          } else if (event.keyCode === 27) {
            setEdit(!edit);
            setHover(false);
            props.editState({...props.state, [props.attribute]: temp })
          }
        }}
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
      <span
        onClick={() => {
          setEdit(true);
        }}
        style={{
          color: blank? "#ddd" : "#444",
          fontStyle: blank? 'italic' : 'normal',
          display: props.on && edit? 'none' : 'inline'
        }}
      >
        {blank? 'Untitled' : type == 'text'? props.state[props.attribute] : dateString(props.state[props.attribute])[0]}
      </span>
      {props.on? <i
        style={{color: hover? '#444' : '#ddd'}}
        className={"glyphicon glyphicon-pencil"}
        onClick={() => {
          setEdit(!edit);
        }}
      ></i> : ''}
    </span>
  )
};