const express = require('express');
const userController = require('../controllers/users');

const router = express.Router();

router.get('/',userController.index);
router.post('/create', userController.createUser);
router.get('/:key/:value', userController.findUser, userController.showUser);
router.get('/users_last_days',userController.ultimateFindUsers,userController.showUser);
router.patch('update/:key/:value', userController.findUser, userController.updateUser);
router.delete('delete/:key/:value', userController.findUser, userController.removeUser);


module.exports = router;