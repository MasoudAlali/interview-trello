import React, { ChangeEventHandler, useCallback, useContext, useState } from 'react';
import "./index.scss";
import { DashboardBoardsContext } from "../../../../../providers/DashboardBoardsProvider";
import ModalService from "../../../../../services/modalService";
import Input from "../../../../../components/Input";
import Button from "../../../../../components/Button";

const AddBoardModal = () => {
  const { addBoard } = useContext(DashboardBoardsContext);

  const [ label, setLabel ] = useState<string>("");

  const onChangeText: ChangeEventHandler<HTMLInputElement> = useCallback(({ target: { value } }) => {
    setLabel(value)
  }, []);

  const onAddRequested = useCallback(() => {
    if (!label) return alert("Please enter label");

    addBoard({ label })
    ModalService.closeModal();
  }, [ addBoard, label ])

  return <div className="add-board-modal">
    <Input label={"Label?"} onChange={onChangeText}/>
    <div className="add-board-modal__actions">
      <Button onClick={onAddRequested}>Add</Button>
    </div>
  </div>
}

export default AddBoardModal;
