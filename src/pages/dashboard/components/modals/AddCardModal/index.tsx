import React, { ChangeEventHandler, useCallback, useContext, useState } from 'react';
import "./index.scss";
import { DashboardBoardsContext } from "../../../../../providers/DashboardBoardsProvider";
import ModalService from "../../../../../services/modalService";
import Input from "../../../../../components/Input";
import Button from "../../../../../components/Button";

interface Props {
  boardId: string;
}

const AddCardModal = ({ boardId }: Props) => {
  const { addCardToBoard } = useContext(DashboardBoardsContext);

  const [ label, setLabel ] = useState<string>("");

  const onChangeText: ChangeEventHandler<HTMLInputElement> = useCallback(({ target: { value } }) => {
    setLabel(value)
  }, []);

  const onAddRequested = useCallback(() => {
    if (!label) return alert("Please enter label");

    addCardToBoard({ boardId, label })
    ModalService.closeModal();
  }, [ addCardToBoard, boardId, label ])

  return <div className="add-card-modal">
    <Input label={"Label?"} onChange={onChangeText}/>
    <div className="add-card-modal__actions">
      <Button onClick={onAddRequested}>Add</Button>
    </div>
  </div>
}

export default AddCardModal;
