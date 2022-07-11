import React, { useState } from 'react';
import { initializeWidget, useCloudStorage, useDatasheet, useSettingsButton } from '@vikadata/widget-sdk';
import { Button, LinkButton } from '@vikadata/components';
import { Setting } from './setting';
import styles from './index.css';
import { IFormData } from './types';
import { validateConfig } from './utils';
import { ChooseField } from './choose-field';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Context } from './context';

const queryClient = new QueryClient();

export const Main: React.FC = () => {
  const [isSettingOpened, toggleSettings] = useSettingsButton();
  if (isSettingOpened) {
    return <Setting />
  }
  const datasheet = useDatasheet();
  const [formData] = useCloudStorage<IFormData>(`airtable-import-${datasheet?.datasheetId}`, {
    apiKey: '',
    baseId: '',
    tableId: ''
  });

  const [step, setStep] = useState(0);
  const isValid = validateConfig(formData);
  const handleNext = () => {
    setStep(step + 1);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Context.Provider
        value={{
          step, setStep
        }}
      >
        {step === 0 && (
          <div className={styles.importMain}>
            {!isValid && (
              <div className={styles.error}>
                请先补全配置 <LinkButton component="button" onClick={() => toggleSettings()} >修改配置</LinkButton>
              </div>
            )}
            <div className={styles.title}>
              点击下方按钮或展开小程序即可开始导入 Airtable 数据
            </div>
            <Button disabled={!isValid} color="primary" onClick={() => handleNext()}>开始导入</Button>
          </div>
        )}
        {step > 0 && <ChooseField formData={formData} />}
      </Context.Provider>
    </QueryClientProvider>
  );
};

initializeWidget(Main, process.env.WIDGET_PACKAGE_ID);
