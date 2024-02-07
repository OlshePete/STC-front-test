export const fields_settings = {
  first_name: "Имя",
  last_name: "Фамилия",
  patronymic: "Отчество",
  phoneNumber: "Телефоны",
  address: "Адрес",
  mail: "Почта",
};
export const contact_template = {
  first_name: "",
  last_name: "",
  patronymic: "",
  phoneNumber: "",
  address: "",
  mail: "",
  image: null,
};
export const validateForm = (values, setErrors) => {
    const errors = {};
    if (
      values.mail.length > 0 &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.mail)
    ) {
      errors.mail = "Не правильный формат почты";
    }
    if (`${values.first_name ?? ""}${values.last_name}`.length === 0) {
      errors.last_name = "Заполните хотя бы одно поле";
      errors.first_name = "Заполните хотя бы одно поле";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
export const uploadImage  = async (event, setValues) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const image = new Image();
        image.src = reader.result;
        image.onload = async () => {
          const canvas = document.createElement("canvas");
          const maxWidth = 160;
          const maxHeight = 160;
          let width = image.width;
          let height = image.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL("image/webp"); // Сжимаем в формате WebP

          setValues((prev) => ({
            ...prev,
            ["image"]: compressedDataUrl,
          }));
        };
      };
      reader.readAsDataURL(file);
    }
}
export function phoneFormat(input) {
    input = input.replace(/\D/g,'');
    const size = input.length;
    
    if (size<=2) return input

    input=input.slice(-size,-10)+' '+input.slice(-10,-7)+' '+input.slice(-7,-4)+'-'+input.slice(-4,-2)+'-'+input.slice(-2).trim()
    
    if(input.trim()[0] === "-") input=input.trim().slice(1)
    
    if(size === 11) input="+"+input
    
    return input;
}