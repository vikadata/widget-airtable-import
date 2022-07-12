import { FieldType } from '@vikadata/widget-sdk';

export const AIRTABLE_URL = 'https://api.airtable.com';

export const AIRTABLE_API_VERSION = 'v0';

export const FIELD_GROUPS = {
  boolean: [FieldType.Checkbox],
  number: [FieldType.Number, FieldType.Rating, FieldType.Currency, FieldType.Percent],
  array: [FieldType.MultiSelect, FieldType.SingleSelect],
  string: [
    FieldType.Text, FieldType.SingleText, FieldType.Email, FieldType.Phone, FieldType.URL, FieldType.Phone
  ],
}

export const TYPE_OPTIONS = [
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
  { label: '电话', value: FieldType.Phone },
  { label: '附件', value: FieldType.Attachment },
]

