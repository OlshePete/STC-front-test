import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import styles from './Modal.module.css';
import ContactForm from '../ContactForm/ContactForm';
import ContactView from '../ContactView/ContactView';
import { setModeType } from '../../store/mainSlice';

const getLabel = (mode) => {
 switch (mode) {
  case "view":
    return "Просмотр контакта";
  case "edit":
    return "Редактировать контакт";
  case "create":
    return "Добавить контакт";
  case "export":
    return "Экспортировать контакты";
  case "import":
    return "Импортировать контакты";
  default:
    return
}
}

const getView = (mode, contact, onSubmit, closeModal) => {
   switch (mode) {
  case "view":
    return <ContactView  contact={contact} closeModal={closeModal}/>;
  case "edit":
    return <ContactForm  contact={contact} onSubmit={onSubmit} closeModal={closeModal} />;
  case "create":
    return <ContactForm  contact={{}} onSubmit={onSubmit}  closeModal={closeModal}/>;
  case "export":
  case "import":
  default:
    return
}
}

const Modal = ({mode, note, onClose, onSubmit}) => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch()
  const closeModal = () => {
    dispatch(setModeType('view'))
    setIsOpen(false)
    onClose();
  };

  useEffect(() => {
    const handleScroll = () => {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);
  
  return (
    <div>
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <h2>{getLabel(mode)}</h2>
              <div className={styles.modalContent}>
                {
                  getView(mode,note,onSubmit,closeModal)
                }
              </div>
            <div className={styles.modalActions}>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Modal;
