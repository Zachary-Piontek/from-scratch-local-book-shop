const { Router } = require('express');
const { Books } = require('../models/Books');


module.exports = Router()

  .get('/', async (req, res) => {
    const data = await Books.getAll();
    res.json(data);
  });


