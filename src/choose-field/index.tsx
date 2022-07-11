import { Button, Typography } from '@vikadata/components';
import { getRecords } from '../apis';
import React, { useContext, useMemo } from 'react';
import { useQuery } from 'react-query';
import { IFormData, IRecords } from '../types';
import styles from './index.css';
import { getFields } from '../utils';
import { toPairs } from 'lodash';
import { TypeSelect } from '../components/type-select';
import { Context } from '../context';
import { AirTableImport } from '../airtable-import';

interface IChooseField {
  formData: IFormData;
}

export const ChooseField: React.FC<IChooseField> = (props) => {
  const { formData } = props;
  const { step, setStep } = useContext(Context);
  const { isLoading, data, error } = useQuery<IRecords, Error>('records', async () =>
    await getRecords(formData.apiKey, formData.baseId, formData.tableId)
  );

  const fieldMap = useMemo(() => {
    return getFields(data?.records)
  }, [data?.records]);
   
  if (isLoading) return (
    <div>
      加载中...
    </div>
  );

  if (error) return (
    <div>
      An error has occurred: {error}
    </div>
  )

  const handleNext = () => {
    setStep(2);
  }

  console.log('=====', step, fieldMap);

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
              <div className={styles.fieldListItemLeft}>{fieldKey}</div>
              <TypeSelect
                value={fieldType[0]}
              />
            </div>
          )
        })}
      </div>
      <Button onClick={() => handleNext()} color="primary">开始导入</Button>
    </div>
  )
}