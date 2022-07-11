export enum IFormName {
  ApiKey = 'apiKey',
  BaseId = 'baseId',
  TableId = 'tableId',
  ViewId = 'viewId',
}

export interface IFormData {
  [IFormName.ApiKey]: string;
  [IFormName.BaseId]: string;
  [IFormName.TableId]: string;
  [IFormName.ViewId]?: string;
}