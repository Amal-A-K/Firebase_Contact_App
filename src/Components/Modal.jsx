import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div 
        
        className="absolute grid place-items-center top-0 z-40 backdrop-blur h-screen w-screen">
          <div className="relative z-50 m-auto  min-h-[200px] min-w-[80%] bg-white p-2 ">
            <div className="flex justify-end p-2">
              <IoClose onClick={onClose} className="text-3xl cursor-pointer" />
            </div>
            {children}
          </div>
          </div>
         
        
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
