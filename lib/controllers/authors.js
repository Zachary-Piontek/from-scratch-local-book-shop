const { Router } = require('express');
const { Authors } = require('../models/Authors');


module.exports = Router()

  .get('/', async (req, res) => {
    const data = await Authors.getAll();
    res.json(data);
  })
  
  .get('/:id', async (req, res) => {
    const authorId = await Authors.getById(req.params.id);
    res.json(authorId);
  })
  
  .post('/', async (req, res) => {
    const author = await Authors.insert(req.body);
    res.json(author);
  });
