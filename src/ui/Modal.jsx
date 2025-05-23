import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }){
   const [openName, setOpenName] = useState("");

   const close = () => setOpenName("");
   const open = setOpenName;

   return <ModalContext.Provider value={{openName, close, open}}>{children}</ModalContext.Provider>
}

function Open({ children, opens: opensWindowName }){
  const { open } = useContext(ModalContext);

  return cloneElement(children , {onClick: () => open(opensWindowName)})
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  //Here this custom hook is made to tackle the situation of clicking outside the model window so when you click outside the window its close the model window
  const ref = useOutsideClick(close);



  if(name !== openName) return null;
  //   createPortal is a React function that allows rendering components outside their
  // parent component’s DOM hierarchy.
  // --------------------------------------Most Important ------------------------------------------------------------
  //   This is useful for rendering modals because it avoids conflicts with the parent’s styles (css property set to hidden)
  //   and makes the modal more accessible.
  //-------------------------------------------------------------------------------------------
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close})}</div>
      </StyledModal>
    </Overlay>,
    // The modal is rendered inside document.body instead of its parent component’s DOM tree.
    // This ensures the modal is positioned correctly and is not affected by styles from its parent components.
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;



// Event Handling (Bubbling and Capturing)
// Why use event delegation?

// To detect clicks outside the modal and close it.

// Event delegation ensures that clicks on any part of the document are captured, even if they occur outside the modal.

// Bubbling vs. Capturing:

// Bubbling: Events propagate from the target element up to the root of the document.

// Capturing: Events propagate from the root of the document down to the target element.

// In this code, document.addEventListener('click', handleClick, true) uses the capturing phase to ensure the event is handled before it reaches the modal.

//---------------------------------------------------------------------

//-----------------------------------------In this code , this concept is used to close the modal when we click outside so remember that part surely..--------------
