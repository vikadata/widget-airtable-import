import React from 'react';
import { Typography, TextInput } from '@vikadata/components';
import styles from './index.css';

interface IFormInput {
  label: string;
  required?: boolean;
  onChange?: (val: string) => void;
  value?: string;
  error?: string;
}

export const FormInput: React.FC<IFormInput> = props => {
  const { label, onChange, required, value, error } = props;
  const handleChange = (e) => {
    const value = e.target.value.trim();
    onChange?.(value);
  }
  return (
    <div className={styles.formInput}>
      <Typography variant="body3" className={styles.label}>
        {required && <span className={styles.formInputRequired}>*</span>}
        {label}
      </Typography>
      <TextInput
        error={!!error}
        block placeholder="请输入内容"
        onChange={handleChange}
        value={value}
      />
      {error && <div className={styles.formInputError}>{error}</div>}
    </div>
  )
}