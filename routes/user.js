const express = require('express');

const router = express.Router();


router.get('/', (req, res) =>{
    res.status(200).json({status: true, response: { name: "here something should go..." }})
});

router.get('/:id', (req, res) =>{
    res.status(200).json({status: true, response: `doesn´t match with id ${req.params.id}`})
})

router.post('/', (req, res) =>{
    //TO-DO
})

router.put('/:id', (req, res) =>{
    //TO-DO
})

router.delete('/:id', (req, res) => {
    //TO-DO
})

module.exports = router;