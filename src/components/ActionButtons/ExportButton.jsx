import { useSelector } from "react-redux";
import styles from "./ActionButtons.module.css";
import ExportContactsLogo from "../../assets/icons/export-contacts.svg?react";
function ExportButton({ onClose }) {
  const data = useSelector((state) => state.phoneBook.list);
  const handleExport = () => {
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "phoneBook.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onClose();
  };

  const handleParentClick = (event) => {
    if (event.target === event.currentTarget) {
      handleExport();
    }
  };
  return (
    <div onClick={handleParentClick}>
      <button
        className={`${styles.iconButton} ${styles.right}`}
        onClick={handleExport}
      >
        <ExportContactsLogo />
        Экспортировать
        <br /> контакты
      </button>
    </div>
  );
}

export default ExportButton;
