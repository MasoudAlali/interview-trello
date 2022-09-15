import React, { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import "./index.scss";
import ModalService from "../../services/modalService";
import { ModalListener, ModalParams } from "../../types";

const Modal = () => {
  const [ params, setParams ] = useState<ModalParams | null>(null);

  const onRequestShowModal: ModalListener = (_params: ModalParams) => {
    if (!_params) return;

    setParams(_params)
  };

  const onRequestCloseModal = () => {
    setParams(null);
  }

  useEffect(() => {
    ModalService.setOpenListener({ listener: onRequestShowModal });
    ModalService.setCloseListener({ listener: onRequestCloseModal });

    return () => ModalService.removeListeners();
  }, []);

  const onCloseRequested = useCallback(() => {
    ModalService.closeModal();
  }, []);

  const _handleContentClick: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!params) return null;

  return <div className="modal" onClick={onCloseRequested}>
    <div className="modal__content" onClick={_handleContentClick}>
      {params.content}
    </div>
  </div>
}

export default Modal;
