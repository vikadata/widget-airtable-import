import {AIRTABLE_API_VERSION, AIRTABLE_URL} from "../constants";
import {View} from "../types";

export const GetTables = async (personalAccessToken: string, baseId: string, tableId: string) => {
  if (!personalAccessToken) return null;

  const url = `${AIRTABLE_URL}/${AIRTABLE_API_VERSION}/meta/bases/${baseId}/tables`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + personalAccessToken,
      Host: AIRTABLE_URL,
    },
  });

  const json = await response.json();
  const views = json.views.map((view: View) => ({id: view.id, name: view.name}));
  return views;
};
