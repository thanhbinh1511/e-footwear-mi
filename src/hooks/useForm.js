import { useState } from "react";

export function Form(props) {
  const { children, ...other } = props;
  return (
    <form autoComplete="off" {...other}>
      {children}
    </form>
  );
}

export function useForm(initialFormValue, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFormValue);
  const [errors, setErrors] = useState({});
  const [errorsEnable, setErrorsEnable] = useState({});

  const handleInputChange = (e) => {

    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) {
      validate({ [name]: value });
    }
  };
  const resetForm = () => {
    setValues(initialFormValue);
    setErrors({});
    setErrorsEnable({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    errorsEnable,
    setErrorsEnable,
    handleInputChange,
    resetForm,
  };
}
