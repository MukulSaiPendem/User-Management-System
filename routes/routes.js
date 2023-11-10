
const express = require('express');
const router = express.Router();
const userController = require('../Controller/controller.js');

router.post('/create', userController.createUser);
router.put('/edit', userController.updateUser);
router.delete('/delete', userController.deleteUser);
router.get('/getAll', userController.getAllUsers);

module.exports = router;
