import { useState, useEffect } from 'react';
import dateString from '../utils/dateString';
import convertUTC from '../utils/convertUTC';

export default props => {
  const [edit, setEdit] = useState(false),
  [hover, setHover] = useState(false),
  [temp, setTemp] = useState(undefined),
  options = {...props.options},
  blank = props.state[props.attribute] === '',
  type = typeof props.state[props.attribute] === 'number'? 'date' : 'text',
  keyEvent = event => {
    if (event.keyCode === 13) {
      setEdit(!edit);
      setHover(false);
    } else if (event.keyCode === 27) {
      setEdit(!edit);
      setHover(false);
      props.editState({...props.state, [props.attribute]: temp })
    };
  },
  fieldDisplay = type === 'text'? props.state[props.attribute] : dateString(props.state[props.attribute])[1],
  inputType = event => {
    props.editState(
      {...props.state,
        [props.attribute]: type === 'text'? event.target.value : convertUTC(event.target.value)
      }
    );
  };

  if (props.attribute === 'entryTime') {

  }

  useEffect(() => {
    setEdit(false)
  }, [props.on])

  return (
    <span
      style={{cursor: props.on || options.link? 'pointer' : 'text'}}
      onMouseOver={() => { setHover(true) }}
      onMouseLeave={() => { setHover(edit? true : false) }}
      onClick={() => {
        setTemp(props.state[props.attribute]);
      }}
    >
      <input
        autoFocus
        type={type}
        onKeyDown={keyEvent}
        onChange={inputType}
        value={fieldDisplay}
        style={{display: props.on && edit && !options.textarea? 'inline' : 'none'}}
      />
      <textarea
        autoFocus
        type={type}
        onKeyDown={keyEvent}
        onChange={inputType}
        value={fieldDisplay}
        style={{display: props.on && edit && options.textarea? 'inline' : 'none'}}
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
        {blank? props.blank :
          props.attribute === 'entryTime'? props.state.entryTime.time :
          type === 'text'? props.state[props.attribute] : dateString(props.state[props.attribute])[0]}
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