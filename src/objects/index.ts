import { IBoard, ICard } from "../types";

export const convertCard = (card: ICard): ICard => ({
  status: card.status,
  label: card.label,
  deleted: card.deleted,
  createdAt: card.createdAt,
  id: card.id,
  boardId: card.boardId
});

export const convertBoard = (board: IBoard): IBoard => ({
  createdAt: board.createdAt,
  cards: board.cards,
  deleted: board.deleted,
  label: board.label,
  id: board.id
});
