const express = require('express');

const router = express.Router();
const cropController = require('../controllers/crop');
const verifyToken = require('../middlewares')


router.get('/', verifyToken, cropController.list);

router.get('/:id', verifyToken, cropController.find)

router.post('/', verifyToken, cropController.add)

router.put('/:id', verifyToken, cropController.update)

router.delete('/:id', async(req, res) => {
    //TO_DO
})

module.exports = router;