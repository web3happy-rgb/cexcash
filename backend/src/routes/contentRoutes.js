const express = require('express');
const { getPage } = require('../controllers/contentController');

const router = express.Router();

router.get('/:slug', getPage);

module.exports = router;
