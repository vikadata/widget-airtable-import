import { Button, Typography } from '@vikadata/components';
import { FieldType, useActiveViewId, useDatasheet, useFields, upload, IAttachmentValue, t } from '@vikadata/widget-sdk';
import { find } from 'lodash';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { getFileBlob, sleep, Strings } from '../utils';
import { IRecord } from '../types';
import style from './index.css';
import { Context } from '../context';

interface IAddRecord {
  records?: IRecord[];
}
export const AddRecord: React.FC<IAddRecord> = props => {
  const { records } = props;
  const [importing, setImporting] = useState(false);
  const { setStep } = useContext(Context);
  const datasheet = useDatasheet();
  const viewId = useActiveViewId();
  const fields = useFields(viewId);
  const successCountRef = useRef(0);
  const failCountRef = useRef(0);
  useEffect(() => {
    if (!datasheet?.datasheetId) {
      return;
    }
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
              console.log(`${fieldName} 没有对应列`);
              continue;
            } else {
              let recordValue = record.fields[fieldName];
              // 附件添加行：获取附件 blob => 上传 => 添加行
              // TODO: 要限制 blob 大小
              if (field.type === FieldType.Attachment) {
                const files: IAttachmentValue[] = [];
                for(let k = 0; k < recordValue.length; k++) {
                  const rv = recordValue[k];
                  const fileBlob = await getFileBlob(rv.url);
                  const uploadRlt = await upload({
                    file: fileBlob as File,
                    datasheetId: datasheet.datasheetId,
                  });
                  files.push(uploadRlt);
                }
                recordValue = files;
              }
              newRecord[field.id] = recordValue;
            }
          }
          try {
            await datasheet.addRecord(newRecord);
            successCountRef.current++;
          } catch (e) {
            failCountRef.current++;
            console.error(e);
          }
          await sleep(300);
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
       已导入 {successCountRef.current}/{records?.length} 行数据
      </Typography>
      <Typography variant="body3">
      {!importing && t(Strings.import_completed)}
      </Typography>
      {!importing && (
        <Button onClick={() => setStep(0)} color="primary">
          {t(Strings.re_import)}
        </Button>
      )}
    </div>
  )
}