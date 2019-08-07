const Modal = props => {

  return (
    <div style={{display: props.show }} className="modal-bg">
      <div className="modal-box" onClick={event => event.stopPropagation()}>
        <div className="modal-top-row">
          <div className="x-close-button" onClick={() => props.setShow('none')}>X</div>
        </div>
        <div className="modal-content">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;