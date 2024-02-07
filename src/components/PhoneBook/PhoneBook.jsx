import { useEffect, useRef, useState } from "react";
import Modal from "../Dialogs/Modal";
import { TableView } from "../TableView/TableView";
import { useSelector } from "react-redux";

import styles from "./PhoneBook.module.css";
import AppBar from "../AppBar/AppBar";

function PhoneBook() {
  const containerRef = useRef(null);
  const [active, setActive] = useState(null);
  const mode = useSelector((state) => state.phoneBook.mode);
  useEffect(() => {
    if (mode && mode !== "view" && mode !== "edit") setActive({});
  }, [mode]);

  return (
    <div className={styles.container} ref={containerRef}>
      <AppBar />
      <TableView setActive={setActive} />
      {active && (
        <Modal
          mode={mode}
          note={active}
          onClose={() => setActive(null)}
          onSubmit={() => {
            setActive(null);
          }}
        />
      )}
    </div>
  );
}

export { PhoneBook };
