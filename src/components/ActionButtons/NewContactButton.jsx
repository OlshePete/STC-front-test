import styles from "./ActionButtons.module.css";
import AddContactLogo from "../../assets/icons/add-contact.svg?react";
import { useDispatch } from "react-redux";
import { setModeType } from "../../store/mainSlice";
function NewContactButton({ onClose }) {
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(setModeType("create"));
    onClose();
  };

  const handleParentClick = (event) => {
    if (event.target === event.currentTarget) {
      handleOpen();
    }
  };
  return (
    <div onClick={handleParentClick}>
      <button
      className={`${styles.iconButton} ${styles.top}`}
      onClick={handleOpen}
    >
      <AddContactLogo />
      Добавить
      <br /> контакт
    </button>
    </div>
  );
}

export default NewContactButton;
