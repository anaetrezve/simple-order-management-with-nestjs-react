import React, { FC, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

type HandleSaveFunc = () => void;
type HandleCloseFunc = () => void;

interface IModalProps {
  title: string;
  handleSave: HandleSaveFunc;
  handleClose: HandleCloseFunc;
  isOpen: boolean;
}

const Modal: FC<PropsWithChildren<IModalProps>> = (props) => {
  const { title, handleSave, handleClose, isOpen, children } = props;

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={handleClose}
          />
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>
            Close
          </button>
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            Save changes
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
