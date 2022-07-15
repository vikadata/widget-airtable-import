import { Button, IconButton, showAlert, TextButton, Typography } from '@vikadata/components';
import { getRecords } from '../apis';
import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { IFieldMap, IFormData, IRecord } from '../types';
import styles from './index.css';
import { getFields, Strings } from '../utils';
import { concat, keys, omit, toPairs } from 'lodash';
import { TypeSelect } from '../components/type-select';
import { Context } from '../context';
import { AirTableImport } from '../airtable-import';
import { t, useCloudStorage, useDatasheet } from '@vikadata/widget-sdk';
import { TitleRecycleClosedFilled } from '@vikadata/icons';
import { MAX_FIELDS_LEN } from '../constants';

interface IChooseField {
  formData: IFormData;
}

export const ChooseField: React.FC<IChooseField> = (props) => {
  const { formData } = props;
  const { step, setStep } = useContext(Context);
  // airtable api 限制必须分页获取数据，每次最多获取 100 条
  // offset 存在表示还有数据，继续请求
  const { isLoading, data, error } = useQuery<IRecord[], Error>('records', async () => {
    let fetching = true;
    let offset = '';
    let records: IRecord[] = [];
    while(fetching) {
      const rlt = await getRecords(formData.apiKey, formData.baseId, formData.tableId, offset);
      offset = rlt.offset;
      fetching = Boolean(offset);
      records = concat(records, rlt.records);
    }
    return records;
  });
  const datasheet = useDatasheet();

  const [fieldMap, setFieldMap, editable] = useCloudStorage<IFieldMap>(`airtable-import-fields-${datasheet?.datasheetId}`, {});

  useEffect(() => {
    const field = getFields(data);
    setFieldMap(field);
  }, [data])

  const fieldCount = keys(fieldMap).length;

  useEffect(() => {
    if (fieldCount > MAX_FIELDS_LEN) {
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
    return <AirTableImport fieldMap={fieldMap} records={data} />
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
        <Button disabled={fieldCount > MAX_FIELDS_LEN} onClick={() => handleNext()} color="primary">
          {t(Strings.start_import)}
        </Button>
      </div>
    </div>
  )
}