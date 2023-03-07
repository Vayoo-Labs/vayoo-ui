import React, { useEffect, useMemo, useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";

const SingleInputModal = ({ title, buttonTitle, onClick }: any) => {
  const [show, setShow] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  }, []);

  if (!didMount) {
    return null;
  }

  const onChangeAmount = (value: string) => {
    let amount = Number.parseInt(value);
    if (isNaN(amount)) amount = 0;
    setAmount(amount);
  };

  return (
    <div className="">
      <button
        onClick={() => setShow(!show)}
        className="w-48 px-4 py-2 border-2 border-lime-100/80 rounded-xl hover:bg-fuchsia-200/20 hover:border-fuchsia-100/80"
      >
        {buttonTitle}
      </button>
      <Modal
        show={show}
        onHide={() => {
          setButtonDisabled(true);
          setShow(false);
        }}
        onEntered={() => {
          setButtonDisabled(false);
        }}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        data-theme="dark"
        className="dark"
      >
        <Modal.Header className="w-full flex flex-col p-0 border-2 border-white border-b-0 rounded-tl-2xl rounded-tr-2xl bg-black">
          <div className="py-6">
            <IoMdClose
              size={26}
              className="absolute cursor-pointer top-4 right-4 hover:opacity-75 "
              onClick={() => {
                setButtonDisabled(true);
                setShow(false);
              }}
            />
            <div className="flex px-10">
              <p className="text-xl fosnt-medium text-white">
                {title}
              </p>
            </div>
            <div className="flex justify-between gap-3 text-white items-center">
              Amount:{" "}
              <input
                value={amount}
                onChange={(e) => onChangeAmount(e.target.value)}
                className="py-1 px-2 text-sm stext-center text-black bg-white-900 rounded-xl border-white-500"
              />
            </div>
          </div>
        </Modal.Header>
        <Modal.Body className="-mt-4 w-full flex flex-col bg-black rounded-bl-xl rounded-br-xl border-white border-2 border-t-0 items-center">
          <div className="mb-2">
            <button
              onClick={() => onClick(amount)}
              className="text-white px-4 py-2 border-2 border-lime-100/80 rounded-xl hover:bg-fuchsia-200/20 hover:border-fuchsia-100/80"
            >
              {buttonTitle}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SingleInputModal;
