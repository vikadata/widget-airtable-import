import { Datasheet, FieldType, IField } from '@vikadata/widget-sdk';
import { toPairs } from 'lodash';

export const addField = async (fieldMap: {
  [key: string]: [FieldType, string[]];
}, datasheet?: Datasheet) => {
  if (!datasheet) return null;
  await Promise.all(toPairs(fieldMap).map(([fieldKey, fieldTypes], index) => {
    let property: IField['property'] = null;
    const [fieldType, defaultOptions] = fieldTypes;
    if (fieldType === FieldType.SingleSelect || fieldType === FieldType.MultiSelect) {
      property = {
        options: defaultOptions.map(option => ({ name: option }))
      }
    }
    console.log(fieldKey, fieldType, property);
    const check = datasheet.checkPermissionsForAddField(fieldKey, fieldType, property);
    console.log('check', check)
    if (check.acceptable) {
      datasheet.addField(fieldKey, fieldType, property);
    } else {
      console.error(`列 ${fieldKey} 添加失败：${check.message}`);
    }
  }))
}