import React from 'react';
import { IBoard } from "../../../../types";
import "./index.scss";
import Board from "../Board";
import NewBoard from "../NewBoard";

interface Props {
  boards: IBoard[];
}

const BoardsContainer = ({ boards }: Props) => {
  return <div className={"boards-container"}>
    {boards.map((_board) => <Board board={_board} key={_board.id}/>)}
    <NewBoard/>
  </div>
}

export default BoardsContainer;
