import React from 'react';
import { Typography, TextInput } from '@vikadata/components';
import styles from './index.css';

interface IFormInput {
  label: string;
  required?: boolean;
  onChange?: (val: string) => void;
  value?: string;
}

export const FormInput: React.FC<IFormInput> = props => {
  const { label, onChange, required, value } = props;
  const handleChange = (e) => {
    const value = e.target.value.trim();
    onChange?.(value);
  }
  return (
    <div className={styles.formInput}>
      <Typography variant="body3" className={styles.label}>
        {required && <span className={styles.required}>*</span>}
        {label}
      </Typography>
      <TextInput block placeholder="请输入内容" onChange={handleChange} value={value} />
    </div>
  )
}