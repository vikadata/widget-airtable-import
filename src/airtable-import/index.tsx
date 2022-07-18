import { Typography } from '@vikadata/components';
import { t, useDatasheet } from '@vikadata/widget-sdk';
import React, { useState } from 'react';
import { useEffect } from 'react'
import { IFieldMap, IRecord } from '../types';
import { addField, sleep, Strings } from '../utils';
import { AddRecord } from './add-record';
import style from './index.css';

interface IAirTableImport {
  fieldMap: IFieldMap;
  records?: IRecord[] 
}

export const AirTableImport: React.FC<IAirTableImport> = props => {
  const { fieldMap, records } = props;
  const [importing, setImporting] = useState(false);
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
        {t(Strings.create_fields)}...
      </Typography>
    </div>
  )
}