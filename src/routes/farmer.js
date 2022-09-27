const express = require('express');

const router = express.Router();
const farmerController = require('../controllers/farmer');
const { verifyToken, isAdmin, isGuest } = require('../middlewares');


router.get('/', [ verifyToken, isGuest ], farmerController.list);

router.get('/:id', [ verifyToken, isGuest ], farmerController.find)

router.post('/', [ verifyToken, isGuest ], farmerController.add)

router.put('/:id', [ verifyToken, isAdmin ], farmerController.update)

router.delete('/:id', [ verifyToken, isAdmin ], async(req, res) => {
    //TO_DO
})

module.exports = router;