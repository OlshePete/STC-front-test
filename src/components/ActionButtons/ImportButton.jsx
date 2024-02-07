import ImportContactsLogo from "../../assets/icons/import-contacts.svg?react";
import { useDispatch } from "react-redux";
import styles from "./ActionButtons.module.css";
import { useRef, useState } from "react";
import { contact_template } from "../../utils/formUtils";
import { uploadList } from "../../store/mainSlice";

const filterImportData = (data) => {
  const valid_keys = Object.keys(contact_template)
  return data.reduce((acc, el) => {
    const filteredElement = {}; 
      Object.keys(el).forEach(key => {
      if (valid_keys.includes(key)) {
        filteredElement[key] = el[key];
      }
    });
    if (filteredElement.last_name || filteredElement.last_name) acc.push(filteredElement);
    return acc;
  },[])
}

function ImportButton({onClose}) {
  const dispatch = useDispatch()
  const fileInputRef = useRef(null); 
  const handleParentClick = (event) => {
    if (event.target === event.currentTarget) {
      handleImport();
    }
  };
  const handleImport = () => {

  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = JSON.parse(event.target.result);
      if (data.length>0){
        const filtered_data = filterImportData(data)
        if(data.length!==filtered_data.length) alert(`Внимание ! ${data.length-filtered_data.length} - исключены из списка `)
        if(filtered_data.length>0){
          dispatch(uploadList(filtered_data))
          onClose()
        }
      } else {
        alert('Загруженный файл пуст')
      }
    };

    reader.readAsText(file);
  };
  return (
    <div onClick={handleParentClick}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className={styles.hiddenInput}
        onChange={handleFileChange}
        onClick={() => {
          if (fileInputRef.current) {
            fileInputRef.current.value = null;
          }
        }} 
      />
    <button
      className={`${styles.iconButton} ${styles.left}`} 
       onClick={() => {
          if (fileInputRef.current) {
            fileInputRef.current.click(); 
          }
        }}
    >
      <ImportContactsLogo />
      Импортировать
      <br /> контакты
    </button>
  </div>
  );
}

export default ImportButton;
