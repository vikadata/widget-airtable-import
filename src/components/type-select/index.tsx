import { Select } from '@vikadata/components';
import { FieldType } from '@vikadata/widget-sdk';
import React, { useMemo } from 'react';
import { getOptions } from '../../utils';

export const TypeSelect: React.FC<any> = props => {
  const { value, setValue, isObjectArr } = props;
  const options = useMemo(() => {
    return getOptions(isObjectArr ? FieldType.NotSupport : value);
  }, [value])
  return (
    <Select
      disabled={options.length === 1}
      options={options as any}
      value={value}
      onSelected={(option) => {
        setValue(option.value);
      }}
    />
  )
}