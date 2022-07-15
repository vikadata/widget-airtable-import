import { AIRTABLE_API_VERSION, AIRTABLE_URL } from '../constants';
import queryString from 'query-string';

export const getRecords = async (apiKey: string, baseId: string, tableId: string, offset?: string) => {
  if (!apiKey || !baseId || !tableId) return null;

  const query: {
    [key: string]: string
  } = {};

  if (offset) {
    query.offset = offset;
  }

  // 调试单列
  // query['fields[]'] = 'Attachments';

  const queryStr = queryString.stringify(query);
  
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