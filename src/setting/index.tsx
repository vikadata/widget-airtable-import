import React, { useContext } from 'react';
import { Button, Typography } from '@vikadata/components';
import { FormInput } from '../components/form-input';
import styles from './index.css';
import { t, useCloudStorage, useDatasheet } from '@vikadata/widget-sdk';
import { IFormData, IFormName, IError } from '../types';
import { Strings, validateConfig } from '../utils';
import { isEmpty } from 'lodash';
import { Context } from '../context';

interface ISetting {
  errors: IError;
}


export const Setting: React.FC<ISetting> = props => {
  const { errors } = props;
  const { setStep } = useContext(Context);
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
  const isValid = isEmpty(validateConfig(formData));
  return (
    <div className={styles.setting}>
      <Typography variant="h6">
        1. {t(Strings.setting_title)}
      </Typography>
      <div className={styles.formSetting}>
        <FormInput
          required
          label="API Key"
          onChange={handleKeyChange(IFormName.ApiKey)}
          value={formData.apiKey}
          error={errors.apiKey}
        />
        <FormInput
          required
          label="Base ID"
          onChange={handleKeyChange(IFormName.BaseId)}
          value={formData.baseId}
          error={errors.baseId}
        />
        <FormInput
          required
          label="Table ID"
          onChange={handleKeyChange(IFormName.TableId)}
          value={formData.tableId}
          error={errors.tableId}
        />
        <FormInput
          label={`View ID（${t(Strings.optional)}）`}
          onChange={handleKeyChange(IFormName.ViewId)}
          value={formData.viewId}
        />
      </div>
      <Button
        block
        disabled={!isValid}
        onClick={() => setStep(2)}
        color="primary"
      >
      {t(Strings.next)}
      </Button>
    </div>
  )
};
