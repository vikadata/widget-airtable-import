import { IFieldMap, IRecord } from '../types';
import { set, toPairs, union } from 'lodash';
import { FieldType } from '@vikadata/widget-sdk';
import { FIELD_GROUPS } from '../constants';

export const getFields = (records?: IRecord[]): IFieldMap => {

  if (!records) return {};

  return records.reduce((pre, cur) => {
    toPairs(cur.fields).map(([fieldKey, fieldValue]) => {
      if (!pre[fieldKey]) {
        const type = getFieldType(fieldValue);
        pre[fieldKey] = [type, []];
      }
      // 收集多选默认值，在 addField 时添加默认选项
      // fieldValue 为数组
      if (pre[fieldKey][0] === FieldType.MultiSelect) {
        const defaultOptions = union(pre[fieldKey][1], fieldValue);
        set(pre[fieldKey], 1, defaultOptions);
      } else if (pre[fieldKey][0] === FieldType.Checkbox) {
        set(pre[fieldKey], 1, true);
      } else if (
        FIELD_GROUPS.number.includes(pre[fieldKey][0])
      ) {
        const max = Math.max(pre[fieldKey][1], fieldValue);
        set(pre[fieldKey], 1, Math.max(max, 5));
      } else { // fieldValue 为字符串
        // const defaultOptions = union(pre[fieldKey][1], [fieldValue]);
        set(pre[fieldKey], 1, fieldValue);
      }
    });
    return pre;
  }, {});
}

const getFieldType = (fieldValue) => {
 if (Array.isArray(fieldValue)) {
    if (fieldValue[0]?.url) {
      return FieldType.Attachment;
    }
    return FieldType.MultiSelect
  } else if (typeof fieldValue === 'boolean') {
    return FieldType.Checkbox;
  } else if (typeof fieldValue === 'number') {
    return FieldType.Number;
  }
  return FieldType.Text;
}