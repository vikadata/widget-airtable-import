import { AIRTABLE_API_VERSION, AIRTABLE_URL } from '../constants';
import queryString from 'query-string';
import { IQuery } from '../types';

export const getRecords = async (apiKey: string, baseId: string, tableId: string, query?: IQuery) => {
  if (!apiKey || !baseId || !tableId) return null;

  const _query = query || {};

  // 调试单列
  // _query['fields[]'] = 'Status';

  const queryStr = queryString.stringify(_query);
  
  const url = `${AIRTABLE_URL}/${AIRTABLE_API_VERSION}/${baseId}/${tableId}?${queryStr}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey,
      'Host': AIRTABLE_URL
    }
  });

  const json = await response.json();

  return json
}