const {GET,POST,GETBYID,PUT} = require('../controller/user.controller');
const router = require('express').Router();

router.get('/', GET);
router.get('/:id', GETBYID);
router.post('/', POST);
router.put('/:id', PUT);

module.exports = router;