const router = require('express').Router();
const refreshController = require('../controllers/refresh');

router.get('/', refreshController.handleRefresh);

module.exports = router;
