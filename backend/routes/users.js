const routerUsers = require('express').Router();
const {
  getCurrentUser, changeInfo,
} = require('../controllers/user');

const {
  validateUserInfo,
} = require('../validator/validator');

routerUsers.get('/me', getCurrentUser);
routerUsers.patch('/me', validateUserInfo, changeInfo);

module.exports = routerUsers;
