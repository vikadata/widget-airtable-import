import React, { useState } from 'react';
import { initializeWidget, t, useCloudStorage, useDatasheet, useSettingsButton } from '@vikadata/widget-sdk';
import { Button, LinkButton } from '@vikadata/components';
import { Setting } from './setting';
import styles from './index.css';
import { IFormData } from './types';
import { Strings, validateConfig } from './utils';
import { ChooseField } from './choose-field';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Context } from './context';
import { isEmpty } from 'lodash';

const queryClient = new QueryClient();

export const Main: React.FC = () => {
  const [isSettingOpened, toggleSettings] = useSettingsButton();

  const datasheet = useDatasheet();
  const [formData] = useCloudStorage<IFormData>(`airtable-import-${datasheet?.datasheetId}`, {
    apiKey: '',
    baseId: '',
    tableId: ''
  });

  const [step, setStep] = useState(0);
  const errors = validateConfig(formData);
  const isValid = isEmpty(errors);
  const handleNext = () => {
    setStep(step + 1);
  }

  if (isSettingOpened) {
    return <Setting errors={errors} />
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
              <div className={styles.importMainError}>
                {t(Strings.setting_valid)} <LinkButton component="button" onClick={() => toggleSettings()} >
                  {t(Strings.update_setting)}
                </LinkButton>
              </div>
            )}
            <div className={styles.title}>
              {
                t(Strings.start_import_title)
              }
            </div>
            <Button disabled={!isValid} color="primary" onClick={() => handleNext()}>
              {t(Strings.start_import)}
            </Button>
          </div>
        )}
        {step > 0 && <ChooseField formData={formData} />}
      </Context.Provider>
    </QueryClientProvider>
  );
};

initializeWidget(Main, process.env.WIDGET_PACKAGE_ID);
