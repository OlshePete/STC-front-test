import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectHasResult } from "../../store/selectors";

import styles from "./AppSettingModal.module.css";
import ReactLogo from "../../assets/icons/app-settings.svg?react";

import ExportButton from "../ActionButtons/ExportButton";
import ImportButton from "../ActionButtons/ImportButton";
import NewContactButton from "../ActionButtons/NewContactButton";
import EditModeButton from "../ActionButtons/EditModeButton";

function AppSettingModal() {
  const has_result = useSelector(selectHasResult);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      document.body.style.overflow = isOpen ? "hidden" : "auto";
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);
  useEffect(() => {
    if (!has_result) {
      setIsOpen(true);
    }
  }, [has_result]);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button className={styles.iconButton} onClick={() => setIsOpen(true)}>
        <ReactLogo />
      </button>
      {isOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.selectionBg}></div>
          <div
            className={styles.modalContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalContent}>
              <NewContactButton onClose={closeModal} />
              <ExportButton onClose={closeModal} />
              <ImportButton onClose={closeModal} />
              <EditModeButton onClose={closeModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppSettingModal;
