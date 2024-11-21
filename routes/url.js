const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.post('/', urlController.shortUrlGenerator);
router.get('/:shortId', urlController.redirectUrl);
router.get('/analytics/:shortId', urlController.getAnalytics)

module.exports = router;