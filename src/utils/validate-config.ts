import { IFormData } from "types";

export const validateConfig = (formData: IFormData) => {
  return formData.apiKey && formData.baseId && formData.tableId
}