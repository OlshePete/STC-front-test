import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateContactList } from "../../store/mainSlice";

import styles from "./ContactForm.module.css";

import blankImage from "../../assets/image/blank-image.png";
import FormInputPhoneNumbers from "./FormInputPhoneNumbers";
import { contact_template, fields_settings, uploadImage, validateForm } from "../../utils/formUtils";

function ContactForm({ contact = {}, closeModal }) {
  const dispatch = useDispatch();

  const [values, setValues] = useState({ ...contact_template, ...contact });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e)=>uploadImage(e,setValues)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (Object.keys(errors).length > 0) validateForm(values,setErrors);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm(values,setErrors)) {
      setIsSubmitting(true);
      dispatch(updateContactList(values));
      closeModal();
    }
  };

  const handleReset = () => {
    setValues({ ...contact_template, ...contact });
    setErrors({});
    setIsSubmitting(false);
    closeModal();
  };

  useEffect(() => {
    setValues({ ...contact_template, ...contact });
    setIsSubmitting(false);
    setErrors({});
  }, [contact]);
  return (
    <form onSubmit={handleSubmit} className={styles.formFieldset}>
      {Object.keys(values).map((field_key, index) => {
        if (field_key === "id") return null;
        if (field_key === "image")
          return (
            <div
              key={field_key + index}
              className={styles.imageWrapper}
              style={{
                backgroundImage: `url(${values.image ?? blankImage})`,
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          );
        if (field_key === "phoneNumber")
          return (
            <FormInputPhoneNumbers
              key={field_key + index}
              field_key={field_key}
              initialValue={values[field_key]}
              handler={(new_value) => {
                setValues((prev) => ({
                  ...prev,
                  [field_key]: new_value,
                }));
              }}
              placeholder={fields_settings[field_key]}
            />
          );
        return (
          <div key={field_key + index} className={styles.fieldBlock}>
            <input
              className={styles.fieldInput}
              id={field_key}
              type="text"
              name={field_key}
              value={values[field_key]}
              placeholder={fields_settings[field_key]}
              onChange={handleInputChange}
            />
            {errors[field_key] && (
              <span className={styles.errorMessage}>{errors[field_key]}</span>
            )}
          </div>
        );
      })}
      <div className={styles.modalActions}>
        <button type="submit" disabled={isSubmitting}>
          сохранить
        </button>
        <button type="button" onClick={handleReset}>
          отменить
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
