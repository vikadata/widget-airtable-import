import { FieldType } from '@vikadata/widget-sdk';
import { isEmpty, values } from 'lodash';
import { FIELD_GROUPS, TYPE_OPTIONS } from '../constants';

export const getOptions = (value: FieldType) => {
  const groupValue = values(FIELD_GROUPS).filter(group => group.some(g => g === value));

  return isEmpty(groupValue) ? TYPE_OPTIONS : TYPE_OPTIONS.filter(option => groupValue[0].includes(option.value));

}