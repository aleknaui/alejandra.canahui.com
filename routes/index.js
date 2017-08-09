'use strict';

const express = require('express')
const router = express.Router();

router.get('/', es);
router.get('/en', en);

module.exports = router;

/*
 * En español
 */
function es(req, res, next) {
  res.render('index_es');
}

/*
 * In English
 */
function en(req, res, next) {
  res.render('index_en');
}
