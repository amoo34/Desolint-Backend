// importing required data dependencies
// const { DB_USERNAME, DB_PASSWORD } = require(`./credentials`);

// setting allowed app modes
const ALLOWED_APP_MODES = [`DEV`, `STAGE`, `PROD`];

// fetching app mode from environment
const APP_MODE =
  process.env.APP_MODE && ALLOWED_APP_MODES.includes(process.env.APP_MODE)
    ? process.env.APP_MODE
    : `PROD`;

// exporting config params as module
module.exports = {
  APP_MODE,

  NODE_PORT: 3001,

  API_BASE_URL: `http://localhost:3001`,

  SERVER_ADDRESS: `http://localhost:4000`,

  MONGO_ATLAS_CONNECTION_URI: `mongodb+srv://admin123:admin123@cluster0.rity7z3.mongodb.net/testData`,

  ALLOWED_APP_MODES,

  ALLOWED_MARITAL_STATUSES: [
    `SINGLE`,
    `MARRIED`,
    `DIVORCED`,
    `WIDOWED`,
    `COMPLICATED`,
  ],

  ALLOWED_GENDERS: [`MALE`, `FEMALE`, `NONBINARY`],

  ALLOWED_CUSTOM_ID_LENGTH: 8,

  HTTP_STATUS_CODES: {
    SUCCESS: 200,

    CREATED: 201,

    BAD_REQUEST: 400,

    UNAUTHORIZED: 401,

    FORBIDDEN: 403,

    NOT_FOUND: 404,

    CONFLICT: 409,

    SERVER_ERROR: 500,
  },

  ALLOWED_VALIDATION_SCHEMA_SCOPES: {
    BODY: `BODY`,

    PARAMS: `PARAMS`,

    NONE: `NONE`,
  },

  DEFAULT_RECORDS_PER_PAGE: 50,

  ALLOWED_MIN_PASSWORD_LENGTH: 8,

  MAX_FILE_SIZE_ALLOWED_BYTES: 1024 * 1024 * 10,

  ALLOWED_INCOMING_FILE_TYPES: [`jpg`, `jpeg`, `png`],

  JWT_EXPIRY_IN_SECONDS: 2592000, // 30 Days
};
