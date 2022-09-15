/**
 * Service which is responsible to provide and persist boards data
 * * We can change methods to be Async if we want to fetch data from an API
 * * Most of these operations in this service will be handled by backend
 * * Operations are developed by Immutable mindset which can be moved to redux or other state managements
 */
import StorageService from "./storageService";
import { BoardChangeListener, CardStatus, IBoard, ICard } from "../types";
import { convertBoard, convertCard } from "../objects";
import { v4 as uuidV4 } from "uuid";

class BoardService {
  private persistKey = "boards";

  private _boards: IBoard[] = [];
  private _listeners: BoardChangeListener[] = [];

  constructor() {
    this._boards = StorageService.get(this.persistKey) || [];
  }

  get boards(): IBoard[] {
    return this._boards;
  }

  set boards(_boards: IBoard[]) {
    this._boards = _boards;
    this.persistBoards();
    this.emitChanges();
  }

  addListener = (listener: BoardChangeListener) => {
    this._listeners.push(listener);

    return this.removeListener.bind(this, listener);
  }

  removeListener = (listener: BoardChangeListener) => {
    this._listeners.splice(this._listeners.indexOf(listener))
  }

  emitChanges = () => {
    this._listeners.forEach((listener: BoardChangeListener) => {
      try {
        listener({ boards: this._boards });
      } catch (e) {
      }
    })
  }

  private persistBoards = (): void => {
    StorageService.set(this.persistKey, this.boards);
  }

  getBoard = ({ id }: { id: string }): IBoard | undefined => {
    return this.boards.find((_board) => _board.id === id);
  }

  addBoard = ({ label }: { label: string }): IBoard => {
    const board = convertBoard({
      label,
      deleted: false,
      cards: [],
      createdAt: new Date().toISOString(),
      id: uuidV4()
    });

    this.boards = [
      ...this.boards,
      board
    ];

    return board;
  }

  updateBoard = ({ board, label, cards }: { board: IBoard, label?: string, cards?: ICard[] }): void => {
    const currentBoardIndex = this.boards.findIndex((_board) => _board.id === board.id);
    if (currentBoardIndex === -1) throw new Error("Board not found");

    const _board = convertBoard({
      ...board,
      label: label || board.label,
      cards: cards || board.cards
    })

    this.boards = [
      ...this.boards.slice(0, currentBoardIndex),
      _board,
      ...this.boards.slice(currentBoardIndex + 1)
    ];
  }

  addCardToBoard = ({
                      boardId,
                      label,
                      status = "pending"
                    }: { boardId: string, label: string, status?: CardStatus }): ICard => {
    const board = this.getBoard({ id: boardId });

    if (!board) throw new Error("Board not found");

    const card = convertCard({
      id: uuidV4(),
      createdAt: new Date().toISOString(),
      deleted: false,
      label,
      status,
      boardId
    });

    board.cards = [
      card,
      ...board.cards,
    ]

    this.updateBoard({ board });

    return card;
  }

  updateCard = ({ card, label, status }: { card: ICard, label?: string, status?: CardStatus }): void => {
    const board = this.getBoard({ id: card.boardId });

    if (!board) throw new Error("Board not found");

    const cardIndex = board.cards.findIndex((_card) => _card.id === card.id);

    const _card = convertCard({
      ...card,
      status: status || card.status,
      label: label || card.label
    })

    const newCards = [
      ...board.cards.slice(0, cardIndex),
      _card,
      ...board.cards.slice(cardIndex + 1)
    ]

    this.updateBoard({ board, cards: newCards });
  }

  removeBoard = ({ boardId }: { boardId: string }) => {
    const boardIndex = this.boards.findIndex((_board) => _board.id === boardId);

    if (boardIndex === -1) throw new Error("Board not found");

    const _newBoards = [
      ...this.boards
    ]
    _newBoards.splice(boardIndex, 1);

    this.boards = _newBoards;
  }

  removeCard = ({ card }: { card: ICard }): void => {
    const board = this.getBoard({ id: card.boardId });

    if (!board) throw new Error("Board not found");

    const cardIndex = board.cards.findIndex((_card) => _card.id === card.id);

    const _newCards = [
      ...board.cards
    ];
    _newCards.splice(cardIndex, 1);

    this.updateBoard({ board, cards: _newCards })
  }

  moveCardToBoard = ({ card, destinationBoardId }: { card: ICard, destinationBoardId: string }): void => {
    const board = this.getBoard({ id: card.boardId });
    const destinationBoard = this.getBoard({ id: destinationBoardId });

    if (!board || !destinationBoard) throw new Error("Board not found");

    this.removeCard({ card });

    const _card = convertCard({
      ...card,
      boardId: destinationBoardId
    });

    const _newCards = [
      _card,
      ...destinationBoard.cards
    ]

    this.updateBoard({ board: destinationBoard, cards: _newCards });
  }
}

export default new BoardService();
