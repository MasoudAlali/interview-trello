import { ReactNode } from "react";

// General
export type BoardChangeListener = ({ boards }: { boards: IBoard[] }) => any;

export interface ModalParams {
  content: ReactNode;
}

export type ModalListener = (params: ModalParams) => any;


// Cards Management
export type CardStatus = "done" | "pending";

export interface ICard {
  id: string;
  label: string;
  status: CardStatus;
  boardId: string;
  createdAt: string;
  deleted: boolean;
}

export interface IBoard {
  id: string;
  label: string;
  cards: ICard[];
  createdAt: string;
  deleted: boolean;
}


// Contexts
export interface DashboardContextData {
  boards: IBoard[];
  getBoard: ({ id }: { id: string }) => IBoard | undefined;
  addBoard: ({ label }: { label: string }) => IBoard;
  updateBoard: ({ board, label, cards }: { board: IBoard, label?: string, cards?: ICard[] }) => void;
  addCardToBoard: ({ boardId, label, status }: { boardId: string, label: string, status?: CardStatus }) => ICard;
  updateCard: ({ card, label, status }: { card: ICard, label?: string, status?: CardStatus }) => void;
  removeCard: ({ card }: { card: ICard }) => void;
  removeBoard: ({boardId}: {boardId: string}) => void;
  moveCardToBoard: ({ card, destinationBoardId }: { card: ICard, destinationBoardId: string }) => void;
}
