import { useEffect, useState } from 'react';
import styles from './Modal.module.css';
import RecordForm from '../RecordForm/RecordForm';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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
      <button onClick={openModal}>Open Modal</button>
      {isOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
            <h2>Редактировать пользователя</h2>
            <div className={styles.imageWrapper}>image</div>
            
            <div className={styles.modalContent}>
              <RecordForm/>
            </div>
            <div className={styles.modalActions}>

            <button onClick={closeModal}>Сохранить</button>
            <button onClick={closeModal}>Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
