const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res) => {
  const items = await Item.find({});
  res.render('index', { items });
});

router.get('/items/create', (req, res, next) => {
  res.render('create');
});

router.post('/items/create', async (req, res, next) => {
  const { title, description, imageUrl } = req.body;
  const newItem = new Item({ title, description, imageUrl });
  newItem.validateSync();
  if (newItem.errors) {
    res.status(400).render('create', { newItem: newItem });
  } else {
    await newItem.save();
    res.redirect('/');
  }
});

router.get('/items/:itemId', async (req, res, next) => {
  const { itemId } = req.params;

  await Video.findById({ _id: itemId }, (error, item) => {
    if (error) res.redirect('/');

    res.render('single-item', { item });
  });

});

module.exports = router;
