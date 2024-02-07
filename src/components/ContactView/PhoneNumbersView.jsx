import { phoneFormat } from "../../utils/formUtils";
import styles from "./ContactView.module.css";
function PhoneNumbersView({ content }) {
  if (!Array.isArray(content)) content = [content ?? ""];
  return (
    <>
      {content.map((phone, index) => {
        return (
          <p className={styles.field} key={"phone in view" + index}>
            {phoneFormat(phone)}
          </p>
        );
      })}
    </>
  );
}

export default PhoneNumbersView;
