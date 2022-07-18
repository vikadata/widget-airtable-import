import { FieldType, t } from '@vikadata/widget-sdk';
import { Strings } from './utils/i18n';

export const AIRTABLE_URL = 'https://api.airtable.com';

export const AIRTABLE_API_VERSION = 'v0';

export const FIELD_GROUPS = {
  boolean: [FieldType.Checkbox],
  number: [FieldType.Number, FieldType.Rating, FieldType.Currency, FieldType.Percent],
  array: [FieldType.MultiSelect, FieldType.SingleSelect],
  string: [
    FieldType.Text, FieldType.SingleText, FieldType.Email, FieldType.Phone, FieldType.URL, FieldType.Phone, FieldType.DateTime, FieldType.SingleSelect
  ],
  attach: [FieldType.Attachment]
}

export const TYPE_OPTIONS = [
  { label: t(Strings.long_text), value: FieldType.Text },
  { label: t(Strings.single_text), value: FieldType.SingleText },
  { label: t(Strings.multi_select), value: FieldType.MultiSelect },
  { label: t(Strings.select), value: FieldType.SingleSelect },
  { label: t(Strings.number), value: FieldType.Number },
  { label: t(Strings.date), value: FieldType.DateTime },
  { label: t(Strings.url), value: FieldType.URL },
  { label: t(Strings.email), value: FieldType.Email },
  { label: t(Strings.checkbox), value: FieldType.Checkbox },
  { label: t(Strings.rate), value: FieldType.Rating },
  { label: t(Strings.currency), value: FieldType.Currency },
  { label: t(Strings.percent), value: FieldType.Percent },
  { label: t(Strings.phone), value: FieldType.Phone },
  { label: t(Strings.attachment), value: FieldType.Attachment },
]

export const MAX_FIELDS_LEN = 200;

