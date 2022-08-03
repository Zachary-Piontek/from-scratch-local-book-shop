const { Router } = require('express');
const { Authors } = require('../models/Authors');


module.exports = Router()

  .get('/:id', async (req, res) => {
    // console.log('get by id');
    const authorId = await Authors.getById(req.params.id);
    res.json(authorId);
  })

  .get('/', async (req, res) => {
    const data = await Authors.getAll();
    res.json(data);
  })
  
  
  .post('/', async (req, res) => {
    const author = await Authors.insert(req.body);
    res.json(author);
  });
