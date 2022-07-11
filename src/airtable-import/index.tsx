import { Typography } from '@vikadata/components';
import { FieldType, useDatasheet } from '@vikadata/widget-sdk';
import React, { useState } from 'react';
import { useEffect } from 'react'
import { IRecord } from '../types';
import { addField, sleep } from '../utils';
import { AddRecord } from './add-record';
import style from './index.css';

interface IAirTableImport {
  fieldMap: {
    [key: string]: [FieldType, string[]]
  };
  records?: IRecord[] 
}

export const AirTableImport: React.FC<IAirTableImport> = props => {
  const { fieldMap, records } = props;
  const [importing, setImporting] = useState(true);
  const datasheet = useDatasheet();
  useEffect(() => {
    console.log('创建列...');
    setImporting(true);
    const sync = async () => {
      await addField(fieldMap, datasheet);
      await sleep(500);
      setImporting(false);
    }
    sync();
  }, [])
  if (!importing) {
    return <AddRecord records={records} />
  }
  return (
    <div className={style.importAddField}>
      <Typography variant="h3">
        正在创建列...
      </Typography>
    </div>
  )
}