import { Typography } from '@vikadata/components';
import { FieldType, useDatasheet } from '@vikadata/widget-sdk';
import React, { useState } from 'react';
import { useEffect } from 'react'
import { IRecord } from '../types';
import { addField } from '../utils';
import { AddRecord } from './add-record';

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
      setTimeout(() => {
        setImporting(false);
      }, 500);
    }
    sync();
  }, [])
  if (!importing) {
    return <AddRecord records={records} />
  }
  return (
    <div>
      <Typography variant="body3">
        正在创建列...
      </Typography>
    </div>
  )
}