const express = require('express');
const router = express.Router();
const actionController = require('../controllers/actionController');

// Route để lấy toàn bộ dữ liệu từ bảng sensor
router.get('/getAllActions', actionController.getAllActions);
router.get('/searchActions', actionController.searchActions);
router.post('/insertAction', actionController.insertAction);
router.get('/handleSortingAsc', actionController.handleSortingAsc);
router.get('/handleSortingChosenOne', actionController.handleSortingChosenOne);
module.exports = router;
