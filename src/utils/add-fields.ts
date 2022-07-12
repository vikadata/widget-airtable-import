import { Datasheet, FieldType, IField } from '@vikadata/widget-sdk';
import { toPairs } from 'lodash';
import { IFieldMap } from '../types';

export const addField = async (fieldMap: IFieldMap, datasheet?: Datasheet) => {
  if (!datasheet) return null;
  await Promise.all(toPairs(fieldMap).map(([fieldKey, fieldTypes], index) => {
    let property: IField['property'] = null;
    const [fieldType, defaultOptions] = fieldTypes;
    if (fieldType === FieldType.SingleSelect || fieldType === FieldType.MultiSelect) {
      property = {
        options: (defaultOptions as string[]).map(option => ({ name: option }))
      }
    } else if (fieldType === FieldType.DateTime) {
      property = {
        dateFormat: 'YYYY/MM/DD'
      }
    } else if (fieldType === FieldType.Checkbox) {
      property = {
        icon: 'white_check_mark'
      }
    } else if (fieldType === FieldType.Rating) {
      property = {
        max: defaultOptions as number,
        icon: 'star',
      }
    } else if (fieldType === FieldType.Percent) {
      property = {
        precision: 2,
      }
    } else if (fieldType === FieldType.Currency) {
      property = {
        precision: 2,
        symbol: '¥'
      }
    }
    console.log(fieldKey, fieldType, property);
    const check = datasheet.checkPermissionsForAddField(fieldKey, fieldType, property);
    if (check.acceptable) {
      datasheet.addField(fieldKey, fieldType, property);
    } else {
      console.error(`列 ${fieldKey} 添加失败：${check.message}`);
    }
  }))
}