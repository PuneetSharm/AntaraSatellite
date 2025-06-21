export const typeOptions = [
  {
    actualValue: "ROCKET BODY",
    labelValue: "Rocket Body",
  },
  {
    actualValue: "PAYLOAD",
    labelValue: "Payload",
  },
  {
    actualValue: "UNKNOWN",
    labelValue: "Unknown",
  },
  {
    actualValue: "DEBRIS",
    labelValue: "Debris",
  },
];

export const orbitalCodeOptions = [
  { actualValue: "{LEO}", labelValue: "LEO" },
  { actualValue: "{LEO1}", labelValue: "LEO1" },
  { actualValue: "{LEO2}", labelValue: "LEO2" },
  { actualValue: "{LEO3}", labelValue: "LEO3" },
  { actualValue: "{LEO4}", labelValue: "LEO4" },
  { actualValue: "{MEO}", labelValue: "MEO" },
  { actualValue: "{GEO}", labelValue: "GEO" },
  { actualValue: "{HEO}", labelValue: "HEO" },
  { actualValue: "{IGO}", labelValue: "IGO" },
  { actualValue: "{EGO}", labelValue: "EGO" },
  { actualValue: "{NSO}", labelValue: "NSO" },
  { actualValue: "{GTO}", labelValue: "GTO" },
  { actualValue: "{GHO}", labelValue: "GHO" },
  { actualValue: "{HAO}", labelValue: "HAO" },
  { actualValue: "{MGO}", labelValue: "MGO" },
  { actualValue: "{LMO}", labelValue: "LMO" },
  { actualValue: "{UFO}", labelValue: "UFO" },
  { actualValue: "{ESO}", labelValue: "ESO" },
  { actualValue: "UNKNOWN", labelValue: "UNKNOWN" },
];

export const sortOptions = [
  {
    actualValue: "SNASC",
    labelValue: "Sort by Name (ASC)",
  },
  {
    actualValue: "SNDESC",
    labelValue: "Sort by Name (DESC)",
  },
  {
    actualValue: "SCATASC",
    labelValue: "Sort by noradCatId (ASC)",
  },
  {
    actualValue: "SCATDESC",
    labelValue: "Sort by noradCatId (DESC)",
  },
];

export const sortBasedOnName = (data, sortingOption) => {
  if (sortingOption === "SNASC") {
    const sortedResult = data?.sort((a, b) => a.name.localeCompare(b.name));
    return sortedResult;
  } else if (sortingOption === "SNDESC") {
    const sortedResult = data?.sort((a, b) => b.name.localeCompare(a.name));
    return sortedResult;
  } else if (sortingOption === "SCATASC") {
    const sortedResult = data?.sort((a, b) =>
      a.noradCatId.localeCompare(b.noradCatId)
    );
    return sortedResult;
  } else if (sortingOption === "SCATDESC") {
    const sortedResult = data?.sort((a, b) =>
      b.noradCatId.localeCompare(a.noradCatId)
    );
    return sortedResult;
  }
};

export const filterByOrbitalCode = (data, selectedCodes) => {
  return data.filter((item) => selectedCodes.includes(item.orbitCode));
};

export const filterDataBasedOnObjectType = (data, objectTypeArray) => {
  const filteredResult = data.filter((item) =>
    objectTypeArray.includes(item.objectType)
  );
  return filteredResult;
};
