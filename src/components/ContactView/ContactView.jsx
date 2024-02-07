import styles from "./ContactView.module.css";
import blankImage from "../../assets/image/blank-image.png";
import PhoneNumbersView from "./PhoneNumbersView";
import { fields_settings } from "../../utils/formUtils";
import { useDispatch } from "react-redux";
import { setModeType } from "../../store/mainSlice";
function ContactView({ contact, closeModal }) {
  const dispatch = useDispatch()
  const fields = Object.keys(contact).filter(
    (f) => !["image", "id"].includes(f) && contact[f]
  );
    const handleSwitchEdit = () => {
      dispatch(setModeType('edit'))
    }
  return (
    <div className={styles.container}>
      <div
        className={styles.imageWrapper}
        style={{
          backgroundImage: `url(${contact.image ?? blankImage})`,
        }}
      ></div>
      {fields &&
        fields.map((field_key, index) => {
          const content = contact[field_key];
          return (
            <div key={field_key + index} className={styles.fieldBlock}>
              <span>{fields_settings[field_key]}</span>
              {field_key === "phoneNumber" ? (
                <PhoneNumbersView content={content} />
              ) : (
                <p className={styles.field} key={field_key + index}>
                  {content}
                </p>
              )}
            </div>
          );
        })}
         <div className={styles.modalActions}>
          <button type="button" onClick={handleSwitchEdit}>
            изменить
          </button>
          <button type="button" onClick={closeModal}>
            отменить
          </button>
        </div>
    </div>
  );
}

export default ContactView;
