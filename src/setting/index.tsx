import React from 'react';
import { Button, Typography } from '@vikadata/components';
import { FormInput } from '../components/form-input';
import styles from './index.css';
import { useCloudStorage, useDatasheet, useSettingsButton } from '@vikadata/widget-sdk';
import { IFormData, IFormName } from '../types';
import { validateConfig } from '../utils';


export const Setting: React.FC = () => {
  const [, toggleSettings] = useSettingsButton();
  const datasheet = useDatasheet();
  const [formData, setFormData, editable] = useCloudStorage<IFormData>(`airtable-import-${datasheet?.datasheetId}`, {
    apiKey: '',
    baseId: '',
    tableId: ''
  });
  if (!editable) {
    return (
      <div>
        无编辑权限
      </div>
    )
  }
  const handleKeyChange = (name: IFormName) => (val: string) => {
    setFormData({
      ...formData,
      [name]: val,
    })
  }
  const isValid = validateConfig(formData);
  return (
    <div className={styles.setting}>
      <Typography variant="h6">
        请前往 Airtable 获取下方参数信息 
      </Typography>
      {!isValid && (
        <div className={styles.error}>
          请补全配置
        </div>
      )}
      <div className={styles.formSetting}>
        <FormInput
          required
          label="API Key"
          onChange={handleKeyChange(IFormName.ApiKey)}
          value={formData.apiKey}
        />
        <FormInput
          required
          label="Base ID"
          onChange={handleKeyChange(IFormName.BaseId)}
          value={formData.baseId}
        />
        <FormInput
          required
          label="Table ID"
          onChange={handleKeyChange(IFormName.TableId)}
          value={formData.tableId}
        />
        <FormInput
          label="View ID（可选）"
          onChange={handleKeyChange(IFormName.ViewId)}
          value={formData.viewId}
        />
      </div>
      <Button
        block
        disabled={!isValid}
        onClick={() => toggleSettings()}
        color="primary"
      >
      完成
      </Button>
    </div>
  )
};
