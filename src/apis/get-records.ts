import { AIRTABLE_API_VERSION, AIRTABLE_URL } from '../constants';

export const getRecords = (apiKey: string, baseId: string, dstId: string) => {
  if (!apiKey || !baseId || !dstId) return null;
  
  const url = `${AIRTABLE_URL}/${AIRTABLE_API_VERSION}/${baseId}/${dstId}`;
  // ?fields%5B%5D=Tags

  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey,
      'Host': AIRTABLE_URL
    }
  }).then(res =>
    res.json()
  )
}