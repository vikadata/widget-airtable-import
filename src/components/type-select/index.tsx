import { Select } from '@vikadata/components';
import { FieldType } from '@vikadata/widget-sdk';
import React from 'react';

export const TypeSelect: React.FC<any> = props => {
  const { value, setValue } = props;
  return (
    <Select
      options={[
        { label: '文本', value: FieldType.Text },
        { label: '附件', value: FieldType.Attachment },
        { label: '单选', value: FieldType.SingleSelect },
        { label: '多选', value: FieldType.MultiSelect },
      ]}
      value={value}
      onSelected={(option) => {
        setValue(option.value);
      }}
    />
  )
}