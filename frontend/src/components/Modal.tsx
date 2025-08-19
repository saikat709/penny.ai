import { useNavigate } from "react-router-dom";
import type { ModalProps } from "../custom_types/PropTypes";

const Modal = ({ isOpen, onClose, children }: ModalProps) => {

    const navigate = useNavigate();
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-100 bg-white/10 backdrop-blur-sm">
            <div className="bg-white p-0 rounded shadow-lg z-10 rounded-lg">
              <button
                className="absolute top-2 right-2 text-gray-200 hover:text-gray-700 font-bold text-5xl pr-10 pt-10" 
                onClick={ ()=>{
                    if (onClose)  onClose();
                    else  navigate(-1);
                 }}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;