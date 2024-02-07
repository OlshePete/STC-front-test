import styles from "./ActionButtons.module.css";
import EditContactsLogo from "../../assets/icons/edit-contacts.svg?react";
import { useDispatch } from "react-redux";
import { setModeType } from "../../store/mainSlice";

function EditModeButton({onClose}) {
  const dispatch = useDispatch();

  const handleEditMode = () => {
    dispatch(setModeType("edit"));
    onClose();
  };
  const handleParentClick = (event) => {
    if (event.target === event.currentTarget) {
      handleEditMode();
    }
  };
  return (
    <div onClick={handleParentClick}>
       <button className={`${styles.iconButton} ${styles.bottom}`} onClick={handleEditMode}>
      <EditContactsLogo />
      Редактировать
      <br /> список
    </button>
    </div>
  );
}

export default EditModeButton;
