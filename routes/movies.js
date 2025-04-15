const router = require('express').Router();

//index
router.get('/', movieController.index);

//show
router.get('/:id', movieController.show);

module.exports = router