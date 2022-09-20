const express = require('express');

const router = express.Router();
const cropController = require('../controllers/crop');


router.get('/', async (req, res) =>{
    const result = await cropController.list();
    res.status(result.status).json({message: result.message, data: result.data})
});

router.get('/:id', async (req, res) =>{
    const result = await cropController.find(get);
    res.status(result.status).json({message: result.message, data: result.data})
})

router.post('/', async (req, res) =>{
    const result = await cropController.add(req);
    res.status(result.status).json({message: result.message, data: result.data})
})

router.put('/:id', async (req, res) =>{
    const result = await cropController.update(req);
    res.status(result.status).json({message: result.message, data: result.data})
})

router.delete('/:id', async(req, res) => {
    //TO_DO
})

module.exports = router;