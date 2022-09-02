interface Constants {
  SANITY_DATASET: string;
  SANITY_PROJECT_ID: string;
};

const constants: Constants = {
  SANITY_DATASET: process.env.SANITY_DATASET as string,
  SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID as string
};

Object.entries(constants).forEach(([key, value]) => {
  if (typeof value === "undefined")
    throw new Error(`${key} not found!`);
});

export default constants;