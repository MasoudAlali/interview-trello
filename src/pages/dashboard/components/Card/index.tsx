import React, { ChangeEventHandler, useCallback, useContext, useState } from 'react';
import { ICard } from "../../../../types";
import "./index.scss"
import { DashboardBoardsContext } from "../../../../providers/DashboardBoardsProvider";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import { convertDateTime } from "../../../../utilities/date";
import ModalService from "../../../../services/modalService";
import MoveCardModal from "../modals/MoveCardModal";

interface Props {
  card: ICard;
}

const Card = ({ card }: Props) => {
  const { updateCard, removeCard } = useContext(DashboardBoardsContext);
  const [ label, setLabel ] = useState<string>(card.label);
  const [ isEditMode, setIsEditMode ] = useState<boolean>(false);

  const onTextChange: ChangeEventHandler<HTMLInputElement> = useCallback(({ target: { value } }) => {
    setLabel(value);
  }, [])

  const onSubmitTitle = useCallback(() => {
    updateCard({
      card,
      label
    });
    setIsEditMode(false);
  }, [ label, card, updateCard ]);

  const changeStatus = useCallback(() => {
    updateCard({
      card,
      status: card.status === "done" ? "pending" : "done"
    })
  }, [ card, updateCard ]);

  const onRemoveCard = useCallback(() => {
    removeCard({ card })
  }, [ card, removeCard ])

  const onEditRequest = useCallback(() => {
    setIsEditMode(true);
  }, []);

  const onMoveRequest = useCallback(() => {
    ModalService.showModal({
      content: <MoveCardModal card={card}/>
    })
  }, [ card ]);

  return <div className="card">
    <div className="card__title-container">
      {isEditMode ?
        <>
          <Input containerClassName="card__title-input" type="text" onChange={onTextChange} value={label}/>
          <button onClick={onSubmitTitle} className="card__title-submit-button">OK</button>
        </> :
        <span className={`card__title-text ${card.status === "done" ? 'card__title-text--done' : ''}`}
              onClick={onEditRequest}>
          {card.label}
        </span>
      }
    </div>
    <div className="card__details">
      <span className="card__date-text">{convertDateTime(card.createdAt)}</span>
    </div>
    <div className="card__actions">
      <Button onClick={onMoveRequest}>Move</Button>
      <Button onClick={onRemoveCard}>Remove</Button>
      <Button onClick={changeStatus}>{card.status === "done" ? "Continue" : "Done"}</Button>
    </div>
  </div>
}

export default Card;
