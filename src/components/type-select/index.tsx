import { Select } from '@vikadata/components';
import { FieldType } from '@vikadata/widget-sdk';
import React from 'react';

export const TypeSelect: React.FC<any> = props => {
  const { value, setValue } = props;
  return (
    <Select
      options={[
        { label: '多行文本', value: FieldType.Text },
        { label: '单行文本', value: FieldType.SingleText },
        { label: '多选', value: FieldType.MultiSelect },
        { label: '单选', value: FieldType.SingleSelect },
        { label: '数字', value: FieldType.Number },
        { label: '日期', value: FieldType.DateTime },
        { label: '网址', value: FieldType.URL },
        { label: '邮箱', value: FieldType.Email },
        { label: '勾选', value: FieldType.Checkbox },
        { label: '评分', value: FieldType.Rating },
        { label: '货币', value: FieldType.Currency },
        { label: '百分比', value: FieldType.Percent },
        { label: '附件', value: FieldType.Attachment },
      ]}
      value={value}
      onSelected={(option) => {
        setValue(option.value);
      }}
    />
  )
}