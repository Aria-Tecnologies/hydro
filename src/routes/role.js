const express = require('express');

const router = express.Router();
const roleController = require('../controllers/role');
const verifyToken = require('../middlewares');

router.get('/', verifyToken, roleController.list);

router.get('/:id', verifyToken, roleController.find)

router.post('/', verifyToken, roleController.add)


module.exports = router;