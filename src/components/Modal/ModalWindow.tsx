import { FC } from "react";
import { Modal } from "antd";

interface ModalWindowProp {
  isOpen: boolean;
  setIsModalOpen: (v: boolean) => void;
  okHandle: () => void;
  time: string;
  score: number;
  total: number;
}

export const ModalWindow: FC<ModalWindowProp> = ({
  isOpen,
  time,
  score,
  total,
  setIsModalOpen,
  okHandle,
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
    okHandle();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Your time: <strong>{time}</strong>
        </p>
        <p>
          Your score is {score} from {total}
        </p>
      </Modal>
    </>
  );
};
