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
  timeDisplay = props.attribute === 'entryTime'? dateString(props.state[props.attribute])[3] : '00:00',
  inputType = event => {
    props.editState(
      {...props.state,
        [props.attribute]: type === 'text'? event.target.value :
        convertUTC(event.target.value)
      }
    );
  },
  changeEntryTime = event => {
    props.editState(
      {...props.state,
        entryTime: convertUTC(
          event.target.value[2] === ':'? fieldDisplay : event.target.value,
          event.target.value[2] === ':'? event.target.value : timeDisplay
        )
      }
    );
  };

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
        type='time'
        onKeyDown={keyEvent}
        onChange={changeEntryTime}
        value={timeDisplay}
        style={{display: props.on && edit && props.attribute === 'entryTime'? 'inline' : 'none'}}
      />
      <input
        autoFocus
        type={type}
        onKeyDown={keyEvent}
        onChange={props.attribute === 'entryTime'? changeEntryTime : inputType}
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
        props.attribute === 'entryTime'? `${dateString(props.state.entryTime)[2]} ${dateString(props.state.entryTime)[0]}` :
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