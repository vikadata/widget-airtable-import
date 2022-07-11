import { useActiveViewId, useDatasheet, useFields } from '@vikadata/widget-sdk';
import { find } from 'lodash';
import React, { useEffect } from 'react';
import { IRecord } from '../types';

interface IAddRecord {
  records?: IRecord[] 
}
export const AddRecord: React.FC<IAddRecord> = props => {
  const { records } = props;
  const datasheet = useDatasheet();
  const viewId = useActiveViewId();
  const fields = useFields(viewId);
  useEffect(() => {
    const sync = async () => {
      if (records) {
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
          console.log('newRecord', newRecord);
          datasheet?.addRecord(newRecord);
          i++;
        }
      }
    }
    sync();
  }, []);

  return (
    <div>
      正在导入行数据...
    </div>
  )
}