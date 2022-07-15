import { Button, IconButton, showAlert, TextButton, Typography } from '@vikadata/components';
import { getRecords } from '../apis';
import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { IFieldMap, IFormData, IRecords } from '../types';
import styles from './index.css';
import { getFields, Strings } from '../utils';
import { keys, omit, toPairs } from 'lodash';
import { TypeSelect } from '../components/type-select';
import { Context } from '../context';
import { AirTableImport } from '../airtable-import';
import { t, useCloudStorage, useDatasheet } from '@vikadata/widget-sdk';
import { TitleRecycleClosedFilled } from '@vikadata/icons';

interface IChooseField {
  formData: IFormData;
}

export const ChooseField: React.FC<IChooseField> = (props) => {
  const { formData } = props;
  const { step, setStep } = useContext(Context);
  const { isLoading, data, error } = useQuery<IRecords, Error>('records', async () =>
    await getRecords(formData.apiKey, formData.baseId, formData.tableId)
  );
  const datasheet = useDatasheet();

  const [fieldMap, setFieldMap, editable] = useCloudStorage<IFieldMap>(`airtable-import-fields-${datasheet?.datasheetId}`, {});

  useEffect(() => {
    const field = getFields(data?.records);
    setFieldMap(field);
  }, [data?.records])

  const fieldCount = keys(fieldMap).length;

  console.log('fieldMap', fieldMap);

  useEffect(() => {
    if (fieldCount > 200) {
      showAlert({
        content: t(Strings.over_200_fields),
        type: 'error',
        closable: true,
        duration: 0
      });
    }
  }, [fieldCount])


  if (!editable) {
    return (
      <div>
        {t(Strings.no_edit_permission)}
      </div>
    )
  }

  if (isLoading) return (
    <div className={styles.chooseFieldLoading}>
      {t(Strings.get_data)}...
    </div>
  );

  if (error) return (
    <div className={styles.chooseFieldError}>
      An error has occurred: {error}
    </div>
  )

  const handleNext = () => {
    setStep(2);
  }

  const handlePre = () => {
    setStep(0);
  }

  if (step === 2) {
    return <AirTableImport fieldMap={fieldMap} records={data?.records} />
  }
  
  return (
    <div className={styles.chooseField}>
      <Typography variant="h6">
        2. {t(Strings.choose_field_type)} 
      </Typography>
      <Typography variant="body3">
        {t(Strings.field_edit_title)}
      </Typography>
      <div className={styles.fieldList}>
        <div className={styles.fieldListItem}>
          <div className={styles.fieldListItemLeft}>{t(Strings.pre_field_name)}</div>
          <div>{t(Strings.field_type)}</div>
        </div>
        {toPairs(fieldMap).map(([fieldKey, fieldType], index) => {
          return (
            <div key={index} className={styles.fieldListItem}>
              <div>{fieldKey}</div>
              <TypeSelect
                value={fieldType[0]}
                setValue={(val) => {
                  setFieldMap({
                    ...fieldMap,
                    [fieldKey]: [val, fieldType[1]]
                  })
                }}
              />
              <IconButton
                className={styles.fieldListItemDelete}
                icon={TitleRecycleClosedFilled}
                shape="square"
                onClick={() => {
                  const newFieldMap = omit(fieldMap, fieldKey);
                  setFieldMap(newFieldMap);
                }}
              />
            </div>
          )
        })}
      </div>
      <div className={styles.chooseFieldAction}>
        <TextButton onClick={() => handlePre()}>
          {t(Strings.pre)}
        </TextButton>
        <Button disabled={fieldCount > 200} onClick={() => handleNext()} color="primary">
          {t(Strings.start_import)}
        </Button>
      </div>
    </div>
  )
}