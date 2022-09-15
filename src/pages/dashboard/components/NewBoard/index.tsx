import React, { memo, useCallback } from 'react';
import "./index.scss";
import ModalService from "../../../../services/modalService";
import AddBoardModal from "../modals/AddBoardModal";

const NewBoard = () => {
  const onAddHandler = useCallback(() => {
    ModalService.showModal({
      content: <AddBoardModal/>
    })
  }, [])

  return <div className="new-board" onClick={onAddHandler}>
    <span className="new-board__text">+</span>
  </div>
}

export default memo(NewBoard);
