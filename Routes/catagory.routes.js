const express = require('express');
const router = express.Router();
const { Get,Post,Put } = require('../controller/catagory.controller');

router.get("", Get);
router.post("", Post);
router.put("/:id", Put);
module.exports = router;