const express = require('express');
const router = express.Router();
const { Log } = require('../db');

module.exports = router;

router.get('/', (req, res, next) => {
    Log.findAll()
    .then(logs => res.json(logs))
    .catch(next)
})

router.get('/like', (req, res, next) => {
    Log.findAll({where: {love: true}})
    .then(logs => res.json(logs))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
    const id = req.params.id
    const newComment = req.body.comment;
    const newLove = req.body.love;
    Log.findById(id)
    .then(log => {
        log.comment = newComment;
        log.love = newLove;
        log.save({fileds : ['comment', 'love'] })
    })
    .then( () => res.end())
    .catch(next)
})

router.post('/', (req, res, next) => {
    const coffeeBean = req.body.coffeeBean;
    const grindLevel = req.body.grindLevel;
    const coffeeBeanAmount = req.body.coffeeBeanAmount;
    const waterAmount = req.body.waterAmount;
    const comment = req.body.comment;
    const love = req.body.love;

    Log.create({coffeeBean, grindLevel, coffeeBeanAmount,waterAmount, comment, love })
    .then(record => res.json(record.dataValues))
    .catch(next)
})