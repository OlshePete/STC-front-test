import { useEffect, useState } from "react";
import styles from "./ContactForm.module.css";
import useDebounce from "../../utils/hooks/useDebounce";
import { phoneFormat } from "../../utils/formUtils";

function FormInputPhoneNumbers({ placeholder, initialValue, handler }) {
  const [values, setValues] = useState([""]);
  const debouncedValue = useDebounce(values, 500);

  const handleChange = (e, index) => {
    const new_value = e.target.value;
    let new_values = values;
    new_values[index] = phoneFormat(new_value);
    setValues([...new_values]);
  };

  function handleAddPhone() {
    setValues((p) => [...p, ""]);
  }
  function handleDeletePhone(index) {
    setValues((p) => (p.length > 1 ? p.filter((_, i) => i !== index) : [""]));
  }
  useEffect(() => {
    if (typeof initialValue === "string") {
      setValues([phoneFormat(initialValue)]);
    }
    if (Array.isArray(initialValue))
      setValues(initialValue.map((v) => String(v)));
  }, [initialValue]);

  useEffect(() => {
    if (
      JSON.stringify(debouncedValue) !==
      JSON.stringify(
        Array.isArray(initialValue) ? initialValue : [initialValue]
      )
    ) {
      handler(debouncedValue);
    }
  }, [debouncedValue]);
  return (
    <div className={styles.multiPhoneNumber}>
      {values.length > 0 &&
        values.map((value, index) => {
          return (
            <div key={"mobile" + index} className={styles.deletableInput}>
              <input
                className={styles.fieldInput}
                id={"phoneNumber"}
                type="text"
                value={value}
                onChange={(e) => handleChange(e, index)}
                placeholder={
                  index === 0 ? placeholder : `доп. телефон ${index}`
                }
              />
              {(value || values.length > 1) && (
                <span onClick={() => handleDeletePhone(index)}>+</span>
              )}
            </div>
          );
        })}
      {values[values.length - 1].length > 0 && (
        <span onClick={handleAddPhone}>+</span>
      )}
    </div>
  );
}

export default FormInputPhoneNumbers;
