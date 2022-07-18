import { Select } from '@vikadata/components';
import React, { useMemo } from 'react';
import { getOptions } from '../../utils';

export const TypeSelect: React.FC<any> = props => {
  const { value, setValue } = props;
  const options = useMemo(() => {
    return getOptions(value);
  }, [value])
  return (
    <Select
      disabled={options.length === 1}
      options={options}
      value={value}
      onSelected={(option) => {
        setValue(option.value);
      }}
    />
  )
}