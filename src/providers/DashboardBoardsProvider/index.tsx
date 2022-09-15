import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { BoardChangeListener, DashboardContextData, IBoard } from "../../types";
import BoardService from "../../services/boardService";

export const DashboardBoardsContext = React.createContext({} as DashboardContextData);

interface Props extends PropsWithChildren {
}

const DashboardBoardsProvider = ({ children }: Props) => {
  const [ boards, setBoards ] = useState<IBoard[]>(BoardService.boards);

  const onBoardUpdated: BoardChangeListener = useCallback(({ boards }) => {
    setBoards(boards);
  }, []);

  useEffect(() => {
    return BoardService.addListener(onBoardUpdated);
  });

  return <DashboardBoardsContext.Provider value={{
    boards,
    addBoard: BoardService.addBoard,
    addCardToBoard: BoardService.addCardToBoard,
    getBoard: BoardService.getBoard,
    updateBoard: BoardService.updateBoard,
    updateCard: BoardService.updateCard,
    removeCard: BoardService.removeCard,
    removeBoard: BoardService.removeBoard,
    moveCardToBoard: BoardService.moveCardToBoard,
  }}>
    {children}
  </DashboardBoardsContext.Provider>
}

export default DashboardBoardsProvider;
