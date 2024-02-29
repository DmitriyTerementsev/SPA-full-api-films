import { useCallback, useState } from "react";

const useForm = (initialValues = {}) => {
  const [inputValues, setInputValues] = useState(initialValues);
  const [errorMessages, setErrorMessages] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputValues({ ...inputValues, [name]: value });

    setErrorMessages({
      ...errorMessages,
      [name]: event.target.validationMessage,
    });

    setIsValid(event.target.closest("#form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setInputValues(newValues);
      setErrorMessages(newErrors);
      setIsValid(newIsValid);
    },
    [setInputValues, setErrorMessages, setIsValid]
  );

  return {
    inputValues,
    errorMessages,
    isValid,
    handleChange,
    resetForm,
    setInputValues,
  };
};

export default useForm;
