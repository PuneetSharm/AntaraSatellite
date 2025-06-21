import axiosClient from "../util/axiosClient";

const defaultAttributeValue =
  "noradCatId,intlDes,name,launchDate,decayDate,objectType,launchSiteCode,countryCode,orbitCode";
const defaultObjectTypeValue = "ROCKET BODY,DEBRIS,UNKNOWN,PAYLOAD";

export const searchDataPoint = async (
  objectTypes = defaultObjectTypeValue,
  attributes = defaultAttributeValue
) => {
  try {
    const response = await axiosClient.get("/v1/satellites", {
      params: {
        objectTypes: objectTypes,
        attributes: attributes,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    return error;
  }
};
