const express = require('express');

const router = express.Router();
const roleController = require('../controllers/role');
const { verifyToken, isAdmin } = require('../middlewares');

router.get('/', [ verifyToken, isAdmin ], roleController.list);

router.get('/:id', [ verifyToken, isAdmin ], roleController.find)

router.post('/', [ verifyToken, isAdmin ], roleController.add)


module.exports = router;