import { Typography } from '@vikadata/components';
import { useActiveViewId, useDatasheet, useFields } from '@vikadata/widget-sdk';
import { find } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { sleep } from '../utils';
import { IRecord } from '../types';
import style from './index.css';

interface IAddRecord {
  records?: IRecord[];
}
export const AddRecord: React.FC<IAddRecord> = props => {
  const { records } = props;
  const [importing, setImporting] = useState(false);
  const datasheet = useDatasheet();
  const viewId = useActiveViewId();
  const fields = useFields(viewId);
  const countRef = useRef(0);
  useEffect(() => {
    const sync = async () => {
      if (records) {
        setImporting(true)
        let i = 0;
        while(i < records.length) {
          const record = records[i];
          let newRecord = {};
          for (const fieldName in record.fields) {
            const field = find(fields, { name: fieldName });
            if (!field) {
              console.log(`${fieldName} 没有对应列`) 
              continue;
            } else {
              const recordValue = record.fields[fieldName];
              newRecord[field.id] = recordValue;
            }
          }
          await datasheet?.addRecord(newRecord);
          await sleep(300);
          countRef.current++;
          i++;
        }
        setImporting(false);
      }
    }
    sync();
  }, []);

  return (
    <div className={style.importAddRecord}>
      <Typography variant="h3">
       已导入 {countRef.current}/{records?.length} 行数据
      </Typography>
      {!importing && '数据导入成功'}
    </div>
  )
}