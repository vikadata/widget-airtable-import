import { IRecord } from '../types';
import { set, toPairs, union } from 'lodash';
import { FieldType } from '@vikadata/widget-sdk';

export const getFields = (records?: IRecord[]): {
  [key: string]: [FieldType, string[]];
} => {

  if (!records) return {};

  return records.reduce((pre, cur) => {
    toPairs(cur.fields).map(([fieldKey, fieldValue]) => {
      if (!pre[fieldKey]) {
        const type = getFieldType(fieldValue);
        pre[fieldKey] = [type, []];
      }
      // 收集多选默认值，在 addField 时添加默认选项
      if (pre[fieldKey][0] === FieldType.MultiSelect) {
        const defaultOptions = union(pre[fieldKey][1], fieldValue);
        set(pre[fieldKey], 1, defaultOptions);
      }
    });
    return pre;
  }, {});
}

const getFieldType = (fieldValue) => {
 if (Array.isArray(fieldValue)) {
    if (fieldValue[0].url) {
      return FieldType.Attachment;
    }
    return FieldType.MultiSelect
  }
  return FieldType.Text;
}