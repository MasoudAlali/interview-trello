import React, { ChangeEventHandler, useCallback, useContext } from 'react';
import { IBoard, ICard } from "../../../../../types";
import "./index.scss";
import { DashboardBoardsContext } from "../../../../../providers/DashboardBoardsProvider";
import ModalService from "../../../../../services/modalService";

interface Props {
  card: ICard;
}

const MoveCardModal = ({ card }: Props) => {
  const { moveCardToBoard, boards } = useContext(DashboardBoardsContext);

  const onChangeRequested: ChangeEventHandler<HTMLSelectElement> = useCallback(({ currentTarget: { value }, }) => {
    if (!value) return alert("Please select a board");
    moveCardToBoard({ card, destinationBoardId: value })
    ModalService.closeModal();
  }, [ moveCardToBoard, card ])

  return <div className="move-card-modal">
    <span className="move-card-modal__input-title">To board?</span>
    <select className="move-card-modal__select" onChange={onChangeRequested}>
      <option value={""}>Select board</option>
      {boards.filter((_board) => _board.id !== card.boardId)
        .map((_board: IBoard) => <option value={_board.id}
                                         key={_board.id}>{_board.label}</option>)}
    </select>
  </div>
}

export default MoveCardModal;
