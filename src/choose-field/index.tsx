import { Button, IconButton, Typography } from '@vikadata/components';
import { getRecords } from '../apis';
import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { IFieldMap, IFormData, IRecords } from '../types';
import styles from './index.css';
import { getFields } from '../utils';
import { omit, toPairs } from 'lodash';
import { TypeSelect } from '../components/type-select';
import { Context } from '../context';
import { AirTableImport } from '../airtable-import';
import { useCloudStorage, useDatasheet } from '@vikadata/widget-sdk';
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

  if (!editable) {
    return (
      <div>
        无编辑权限
      </div>
    )
  }

  if (isLoading) return (
    <div className={styles.chooseFieldLoading}>
      获取 Airtable 数据中...
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

  console.log('=====', data, fieldMap);

  if (step === 2) {
    return <AirTableImport fieldMap={fieldMap} records={data?.records} />
  }
  
  return (
    <div className={styles.chooseField}>
      <Typography variant="h6">
        2. 请选择字段类型 
      </Typography>
      <Typography variant="body3">
      请为下面待导入的 Airtable 字段选择字段类型，导入完成后将在维格表中创建相应的字段并填充对应的数据 
      </Typography>
      <div className={styles.fieldList}>
        <div className={styles.fieldListItem}>
          <div className={styles.fieldListItemLeft}>待导入的字段名</div>
          <div>字段类型</div>
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
      <Button onClick={() => handleNext()} color="primary">开始导入</Button>
    </div>
  )
}