import {AIRTABLE_API_VERSION, AIRTABLE_URL} from "../constants";
import {Base} from "../types";

export const GetBases = async (personalAccessToken: string) => {
  if (!personalAccessToken) {
    throw new Error("personalAccessToken is required");
  }

  const url = `${AIRTABLE_URL}/${AIRTABLE_API_VERSION}/meta/bases`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${personalAccessToken}`,
        Host: AIRTABLE_URL,
      },
    });

    if (response.ok) {
      const json = await response.json();
      const bases = json.bases.map((base: Base) => ({id: base.id, name: base.name}));
      return bases;
    } else {
      throw new Error("Unauthorized: Error Personal Access Token.");
    }
  } catch (e) {
    throw new Error("Unauthorized: Error Personal Access Token.");
  }
};
