const express = require('express');

const router = express.Router();
const cropController = require('../controllers/crop');
const { verifyToken, isAdmin, isGuest } = require('../middlewares')


router.get('/', [ verifyToken, isGuest ], cropController.list);

router.get('/:id', [ verifyToken, isGuest ], cropController.find)

router.post('/', [ verifyToken, isGuest ], cropController.add)

router.put('/:id', [ verifyToken, isAdmin ], cropController.update)

router.delete('/:id', [ verifyToken, isAdmin ], async(req, res) => {
    //TO_DO
})

module.exports = router;