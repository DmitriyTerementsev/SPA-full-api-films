const http2 = require('node:http2');

const RES_OK = http2.constants.HTTP_STATUS_OK;
const RES_CREATED = http2.constants.HTTP_STATUS_CREATED;

module.exports = {
  RES_OK,
  RES_CREATED,
};
