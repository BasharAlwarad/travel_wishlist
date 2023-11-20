const express = require('express');
const { body } = require('express-validator');
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('../controllers/countriesControllers.js');

const router = express.Router();

router
  .route(`/api/countries`)
  .get(getAll)
  .post(
    [
      body('name').notEmpty().isString(),
      body('alpha2Code').notEmpty().isString().isLength({ min: 2, max: 2 }),
      body('alpha3Code').notEmpty().isString().isLength({ min: 3, max: 3 }),
    ],
    createOne
  );
router
  .route(`/api/countries/:code`)
  .get(getOne)
  .delete(deleteOne)
  .put(
    [
      body('name').notEmpty().isString(),
      body('alpha2Code').notEmpty().isString().isLength({ min: 2, max: 2 }),
      body('alpha3Code').notEmpty().isString().isLength({ min: 3, max: 3 }),
    ],
    updateOne
  );

module.exports = router;
