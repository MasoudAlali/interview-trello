import { ModalListener, ModalParams } from "../types";

class ModalService {
  private openListener: ModalListener | null | undefined;

  private closeListener: Function | null | undefined;

  setOpenListener = ({ listener }: { listener: ModalListener }) => {
    this.openListener = listener;
  }

  setCloseListener = ({ listener }: { listener: Function }) => {
    this.closeListener = listener;
  }

  removeListeners = () => {
    this.openListener = null;
    this.closeListener = null;
  }

  showModal = (params: ModalParams) => {
    try {
      this.openListener && this.openListener(params);
    } catch (e) {
    }
  }

  closeModal = () => {
    try {
      this.closeListener && this.closeListener();
    } catch (e) {
    }
  }
}

export default new ModalService();
