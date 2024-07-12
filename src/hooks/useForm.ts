import { useState } from 'react';

export const usePrimitiveForm = <T>(defaultValues: T) => {
  const [values, setValues] = useState<T>(defaultValues);

  const formRegister = (name: keyof T) => {
    return {
      defaultValue: values ? values[name] : null,
      value: values ? values[name] : null,
      onChange: (e: any) => {
        setValues({
          ...values,
          [name]: e.target.value,
        } as T);
      },
    };
  };

  return {
    values,
    formRegister,
  };
};
