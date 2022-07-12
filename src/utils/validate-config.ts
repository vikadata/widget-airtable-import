import { IFormData, IError, IFormName } from '../types';

export const validateConfig = (formData: IFormData) => {
  const errors: IError = {};
  if (!formData.apiKey || !formData.apiKey.startsWith('key')) {
    errors[IFormName.ApiKey] = '请填写正确的 API Key';
  }
  if (!formData.baseId || !formData.baseId.startsWith('app')) {
    errors[IFormName.BaseId] = '请填写正确的 Base ID';
  }
  if (!formData.tableId || !formData.tableId.startsWith('tb')) {
    errors[IFormName.TableId] = '请填写正确的 Table ID';
  }
  return errors;
}