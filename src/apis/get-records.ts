import { AIRTABLE_API_VERSION, AIRTABLE_URL } from '../constants';

export const getRecords = async (apiKey: string, baseId: string, tableId: string) => {
  if (!apiKey || !baseId || !tableId) return null;
  
  const url = `${AIRTABLE_URL}/${AIRTABLE_API_VERSION}/${baseId}/${tableId}?fields%5B%5D=Attachments`;
  // ?fields%5B%5D=Tags

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