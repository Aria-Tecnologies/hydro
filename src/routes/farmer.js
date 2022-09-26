const express = require('express');

const router = express.Router();
const farmerController = require('../controllers/farmer');
const verifyToken = require('../middlewares');


router.get('/', verifyToken, farmerController.list);

router.get('/:id', verifyToken, farmerController.find)

router.post('/', verifyToken, farmerController.add)

router.put('/:id', verifyToken, farmerController.update)

router.delete('/:id', async(req, res) => {
    //TO_DO
})

module.exports = router;