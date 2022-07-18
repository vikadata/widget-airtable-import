import { Button, Typography } from '@vikadata/components';
import {
  FieldType, useActiveViewId, useDatasheet, useFields, upload, IAttachmentValue, t,
  getLanguage, LangType,
} from '@vikadata/widget-sdk';
import { find } from 'lodash';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { getFileBlob, Strings } from '../utils';
import { IFieldMap, IRecord } from '../types';
import style from './index.css';
import { Context } from '../context';
import successImg from '../../space_img_success.png';
import { MAX_FILE_SIZE } from '../constants';

interface IAddRecord {
  records?: IRecord[];
  fieldMap: IFieldMap;
}
export const AddRecord: React.FC<IAddRecord> = props => {
  const { records, fieldMap } = props;
  const [importing, setImporting] = useState(false);
  const { setStep } = useContext(Context);
  const datasheet = useDatasheet();
  const viewId = useActiveViewId();
  const fields = useFields(viewId);
  const successCountRef = useRef(0);
  const failCountRef = useRef(0);
  const stopRef = useRef(false);
  useEffect(() => {
    if (!datasheet?.datasheetId) {
      return;
    }
    const sync = async () => {
      if (records) {
        setImporting(true)
        let i = 0;
        while(i < records.length && !stopRef.current) {
          const record = records[i];
          let newRecord = {};
          for (const fieldName in record.fields) {
            const field = find(fields, { name: fieldName });
            if (!field || !fieldMap[fieldName]) {
              // console.log(`${fieldName} 没有对应列`);
              continue;
            } else {
              let recordValue = record.fields[fieldName];
              // 附件添加行：获取附件 blob => file 带文件名、文件类型 => 上传 => 添加行
              // TODO: 要限制 blob 大小
              if (field.type === FieldType.Attachment) {
                const files: IAttachmentValue[] = [];
                for(let k = 0; k < recordValue.length; k++) {
                  const rv = recordValue[k];
                  const fileBlob = await getFileBlob(rv.url);
                  // 上传小于 10MB 的文件
                  if (fileBlob.size < MAX_FILE_SIZE) {
                    const curFile = new File([fileBlob], rv.filename, {
                      type: rv.type
                    });
                    const uploadRlt = await upload({
                      file: curFile,
                      datasheetId: datasheet.datasheetId,
                    });
                    files.push(uploadRlt);
                  }
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
          i++;
        }
        setImporting(false);
      }
    }
    sync();
  }, []);

  const isZh = getLanguage() === LangType.ZhCN;

  const stopImport = () => {
    stopRef.current = true;
  }

  return (
    <div className={style.importAddRecord}>
      {!importing && !stopRef.current && (
        <img src={successImg} alt="succee image"/>
      )}
      {!importing && !stopRef.current && (
        <Typography variant="h3" className={style.importCompleted}>
          {t(Strings.import_completed)}
        </Typography>
      )}
      {!importing && stopRef.current && (
        <Typography variant="h3" className={style.importStoped}>
          {t(Strings.import_stoped)}
        </Typography>
      )}
      <Typography variant="body3"  className={style.importProcess}>
        {isZh ? (
          <div>
            共 {records?.length} 行数据，已导入
            <span className={style.importAddRecordSuccess}>{successCountRef.current}</span>行、失败
            <span className={style.importAddRecordFail}>{failCountRef.current}</span>行
          </div>
        ): (
          <div>
            A total of {records?.length} records, 
            <span className={style.importAddRecordSuccess}>{successCountRef.current}</span> records has been imported, 
            <span className={style.importAddRecordFail}>{failCountRef.current}</span> records failed
          </div>
        )}
      </Typography>
      {importing && !stopRef.current && (
        <Button variant="fill" color="danger" onClick={() => stopImport()} >
          {t(Strings.stop_import)}
        </Button>
      )}
      {!importing && (
        <Button onClick={() => setStep(0)} color="primary">
          {t(Strings.re_import)}
        </Button>
      )}
    </div>
  )
}