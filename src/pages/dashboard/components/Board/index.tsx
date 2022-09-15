import React, { ChangeEventHandler, useCallback, useContext, useState } from 'react';
import "./index.scss";
import { IBoard } from "../../../../types";
import Card from "../Card";
import NewCard from "../NewCard";
import { DashboardBoardsContext } from "../../../../providers/DashboardBoardsProvider";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";

interface Props {
  board: IBoard;
}

const Board = ({ board }: Props) => {
  const { updateBoard, removeBoard } = useContext(DashboardBoardsContext);
  const [ label, setLabel ] = useState<string>(board.label);
  const [ isEditMode, setIsEditMode ] = useState<boolean>(false);

  const onTextChange: ChangeEventHandler<HTMLInputElement> = useCallback(({ target: { value } }) => {
    setLabel(value);
  }, [])

  const onSubmitTitle = useCallback(() => {
    updateBoard({
      board,
      label
    });
    setIsEditMode(false);
  }, [ label, board, updateBoard ]);

  const onEditRequested = useCallback(() => {
    setIsEditMode(true);
  }, []);

  const onRemoveRequested = useCallback(() => {
    removeBoard({ boardId: board.id });
  }, [ board, removeBoard ])

  return <div className="board">
    <div className="board__title-container">
      {isEditMode ?
        <>
          <Input containerClassName="board__title-input" type="text" onChange={onTextChange} value={label}/>
          <Button onClick={onSubmitTitle} className="card__title-submit-button">OK</Button>
        </> :
        <>
          <h6 className="board__title" onClick={onEditRequested}>{board.label}</h6>
          <Button onClick={onRemoveRequested}>Remove</Button>
        </>
      }
    </div>
    {board.cards.map((_card) => <Card card={_card} key={_card.id}/>)}
    <NewCard boardId={board.id}/>
  </div>
}

export default Board;
