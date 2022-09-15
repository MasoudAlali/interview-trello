import React, { memo, useCallback } from 'react';
import "./index.scss";
import ModalService from "../../../../services/modalService";
import AddCardModal from "../modals/AddCardModal";

interface Props {
  boardId: string;
}

const NewCard = ({ boardId }: Props) => {
  const onAddHandler = useCallback(() => {
    ModalService.showModal({
      content: <AddCardModal boardId={boardId}/>
    })
  }, [ boardId ])

  return <div className="new-card" onClick={onAddHandler}>
    <span className="new-card__text">+</span>
  </div>
}

export default memo(NewCard);
