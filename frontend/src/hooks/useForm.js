// useForm.js
import { useState } from 'react';

export const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return { formData, handleChange };
};
