const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.post('/url/', urlController.shortUrlGenerator);
router.get('/url/:shortId', urlController.redirectUrl);
router.get('/url/analytics/:shortId', urlController.getAnalytics)

module.exports = router;