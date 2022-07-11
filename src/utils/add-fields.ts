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
    datasheet.addField(fieldKey, fieldType, property)
  }))
}